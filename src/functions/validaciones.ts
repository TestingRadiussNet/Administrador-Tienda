export function EmailValido(email: string) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!regex.test(email)) return false;
    return true;
}