import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { getProductBySlug } from 'database';

import { IProduct, ISize, IType } from '../../../interfaces';

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { tesloApi } from 'axiosApi';
import { Product } from 'models';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/components/organisms/layouts/AdminLayout';


const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']


interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { replace } = useRouter()
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
            title={'Producto'}
            subtitle={`Editando: ${product.title}`}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                    >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth
                            multiline
                            sx={{ mb: 1 }}
                            {...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                    

                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }

                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                onChange={({ target }) => { setValue('type', target.value, { shouldValidate: true }) }}
                            >
                                {
                                    validTypes.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('gender')}
                                onChange={({ target }) => { setValue('gender', target.value, { shouldValidate: true }) }}
                            // value={ status }
                            // onChange={ onStatusChanged }
                            >
                                {
                                    validGender.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    
                    </Grid>
                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim() === ' ' ? ' No puede teber espacios en blanco' : undefined

                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            onChange={({ target }) => setNewTagValue(target.value)}
                            onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                        />

                        <Box sx={{
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

                        <Divider sx={{ my: 2 }} />
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={<UploadOutlined />}
                                sx={{ mb: 3 }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Cargar imagen
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
                                label="Es necesario al 2 imagenes"
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
                                ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
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
        delete tempProduct._id;
        tempProduct.images = ['img1.jpg', 'img2.jpg']
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