
export const isValidEmail = (email: string): boolean => {
    const match = (email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        console.log(email);
        console.log(!!match);

        
      return !!match;
  };
  
  export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email) 
      ? undefined
      : 'El correo no parece ser válido';
  }