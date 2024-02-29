const Utils = {
    PreviewImage(input, preview) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = '/assets/media/logo-brand/<%= data.brand.logo.name %>';
        }
    }
}