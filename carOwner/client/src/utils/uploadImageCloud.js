const cloudName = 'dffgj00gs';
const unsignedUploadPreset = 'qwxzmzwb';

export const uploadImageCloud = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', unsignedUploadPreset);
    formData.append('cloud_name', cloudName);

    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "post",
        body: formData
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
            return false
        });
}