// phone number validator
export const validatePhoneNumber = (phoneNumber) => {
    const regexPhone = /^(\+92|0|92)[0-9]{10}$/gm;
    let matches = phoneNumber.match(regexPhone);
    if (!matches) {
        return [
            false,
            [
                "Phone Number: Please chose one of this format '+92xxxxxxxxxx' '92xxxxxxxxxx' '03xxxxxxxx'",
            ],
        ];
    }
    return [true, null];
};
export const EmailRegex = () => new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
