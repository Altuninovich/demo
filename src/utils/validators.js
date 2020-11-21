export const required = value => {
    if (value) return undefined;

    return "Field is required";
}

export const required2 = value => (value || typeof value === 'number' ? undefined : 'Required');
//const fu = (n) => (v) => `vau${n}`;

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
