import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { getProductBySlug, SHOP_CONSTANTS } from 'database';

import { IProduct } from '../../../interfaces';

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { tesloApi } from 'axiosApi';
import { Product } from 'models';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/components/organisms/layouts/AdminLayout';



interface FormData {
    _id?: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    rooms: number;
    bathrooms: number;
    ubication: string;
    tags: string[];
    type: string;
    slug: string;
    highlight: boolean;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product = { ubication: "Fusagasuga" } }) => {
    const { replace } = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({ defaultValues: product });


    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'title') {
                const newSlug = value.title?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLowerCase() || ''
                setValue('slug', newSlug);
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, setValue])
    const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) return;

        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file)
                const { data } = await tesloApi.post('/admin/upload', formData)
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const onSubmit = async (product: FormData) => {
        if (product.images.length < 2) return alert('minimo  2 imagenes')
        setIsSaving(true)

        try {
            const { data } = await tesloApi({
                url: "/admin/products",
                method: product._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar , si no crear
                data: product
            })
            if (!product._id) {
                replace(`/admin/products/${product.slug}`)
                //TODO: recargar el navegador
            } else {
                setIsSaving(false)
            }

        } catch (error) {
            console.log(error);
            setIsSaving(false)

        }
    }


    const onNewTag = () => {
        const newTag = newTagValue.trim().toLowerCase()
        setNewTagValue(newTag)
        const currentTags = getValues('tags')
        if (currentTags.includes(newTag)) {
            return
        }
        currentTags.push(newTag)
    }
    const onDeleteTag = (tag: string) => {
        const updateTags = getValues('tags')
        setValue('tags', updateTags.filter(t => t !== tag), { shouldValidate: true })
    }
    const onDeleteImage = (image: string) => {
        setValue('images', getValues('images').filter(img => img !== image), { shouldValidate: true })
    }
    return (
        <AdminLayout
            title={'Inmueble'}
            subtitle={product.title ? `Editando: ${product.title}` : "Crear Aviso: "}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>


                {/* ---------------------------------Image Section ----------------------------- */}
                <Box
                    display='flex'
                    flexDirection="column"
                    sx={{ maxWidth: "700px", m: '2rem 0' }}
                >
                    <FormLabel sx={{ mb: 2 }}>Imágenes:</FormLabel>
                    <Button
                        color="secondary"
                        fullWidth
                        startIcon={<UploadOutlined />}
                        sx={{ mb: 3, color: "white", fontWeight: "700" }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Cargar Fotos
                    </Button>
                    <input
                        ref={fileInputRef}
                        type='file'
                        multiple
                        accept='image/png,image/jpeg,image/gif'
                        style={{ display: "none" }}
                        onChange={onFileSelected}
                    />
                    <Chip
                        label="Es necesario al menos 2 imagenes"
                        color='error'
                        variant='outlined'
                        sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                    />
                    <Grid container spacing={2}>
                        {getValues('images').map(img => (
                            <Grid item xs={4} sm={3} key={img}>
                                <Card>
                                    <CardMedia
                                        component='img'
                                        className='fadeIn'
                                        image={`${img}`}
                                        alt={img}
                                    />
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            color="error"
                                            onClick={() => onDeleteImage(img)}
                                        >
                                            Borrar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Grid container spacing={2}>
                    {/*-------------------------- Data----------------------- */}
                    <Grid item xs={12} sm={6}>
                        {/* -------------------------Titulo------------------------- */}
                        <TextField
                            label="Título"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                            placeholder='Escriba aca el titulo de la casa'
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                maxLength: { value: 255, message: "Maximo 255 caracteres" }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        {/* ---------------------------Description----------------------- */}
                        <TextField
                            label="Descripción"
                            placeholder='Escriba aca la descripcion de la casa'
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows={23}
                            sx={{ mb: 2 }}
                            {...register('description', {
                                required: 'Este campo es requerido',
                                maxLength: { value: 650, message: "Maximo 650 caracteres" }

                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        {/* -------------------------------------Precio---------------------------- */}
                        <TextField
                            label="Precio"
                            placeholder='Aca va el precio de la casa!'
                            type='number'
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                        <Divider sx={{ my: 1 }} />
                        {/* ----------------------------------Tipo de casa---------------------------- */}
                        <FormControl sx={{ mb: 2 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                onChange={({ target }) => { setValue('type', target.value, { shouldValidate: true }) }}
                            >
                                {SHOP_CONSTANTS.validTypes.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio color='secondary' />}
                                        label={capitalize(option)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        {/* -------------------------------------Habitaciones ------------------------------ */}
                        <TextField
                            label="Habitaciones"
                            placeholder='Cuantos cuartos tiene la casa!'
                            type='number'
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('rooms', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.rooms}
                            helperText={errors.rooms?.message}
                        />
                        {/* -------------------------------------Bathrooms ------------------------------ */}
                        <TextField
                            sx={{ mt: "1rem" }}
                            label="Baños"
                            placeholder='Cuantos baños tiene la casa!'
                            type='number'
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('bathrooms', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.bathrooms}
                            helperText={errors.bathrooms?.message}
                        />
                        {/* -------------------------------------------Ubication---------------------- */}
                        <TextField
                            sx={{ mt: "1rem" }}
                            label="Ubicacion"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            placeholder='Escriba aca donde queda la casa'
                            {...register('ubication', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                maxLength: { value: 255, message: "Maximo 255 caracteres" }
                            })}
                            error={!!errors.ubication}
                            helperText={errors.ubication?.message}
                        />
                    </Grid>
                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        {/* <TextField
                            label="Slug - URL"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim() === ' ' ? ' No puede teber espacios en blanco' : undefined
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        /> */}
                        <TextField
                            label="Etiquetas"
                            variant="outlined"
                            placeholder='Palabras clave ejm: (casa, casa bonita, casa de dos pisos, casa remodelada)'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                            helperText="Presiona tecla [espacio] para agregar"
                            onChange={({ target }) => setNewTagValue(target.value)}
                            onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                            }}
                            component="ul">
                            {getValues('tags').map((tag) => {
                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1 }}
                                    />
                                );
                            })}
                        </Box>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='end' sx={{ mt: 3 }}>
                    <Button
                        disabled={isSaving}
                        color="secondary"
                        startIcon={<SaveOutlined sx={{ width: "1.5rem", height: "1.5rem" }} />}
                        sx={{ fontSize: "1.3rem", color: "white", fontWeight: "700" }}
                        type="submit"
                        fullWidth
                    >
                        Publicar Inmueble
                    </Button>
                </Box>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null;

    if (slug === 'new') {
        //crear un producto
        const tempProduct = JSON.parse(JSON.stringify(new Product()))
        console.log(tempProduct);

        delete tempProduct._id;
        product = tempProduct

    } else {
        product = await getProductBySlug(slug.toString());
    }
    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    // TODO: 
    // procesamiento de las imagenes cuando las subamos al server
    product.images = product.images.map((image) => image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`)
    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage