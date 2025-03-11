# Shopify Image Customizer

A custom image upload and customization tool for Shopify products, allowing customers to upload, crop, resize, and position their images on products - similar to TeeinBlue but with no subscription costs.

## Features

- **Image Upload**: Customers can upload their own images
- **Image Cropping & Editing**: Built-in cropper with rotate, resize, and position controls
- **Live Preview**: Shows how the image will look on the product
- **Seamless Checkout**: Customized image data is included with the order
- **Responsive Design**: Works on both desktop and mobile devices
- **No External Dependencies**: All processing happens in the browser

## Installation

### 1. Add Files to Your Theme

Clone this repository and add the following files to your Shopify theme:

```
├── assets/
│   ├── checkout-custom-image.js
│   └── image-customizer.css
├── sections/
│   └── image-customizer.liquid
├── snippets/
│   └── image-customizer.liquid
└── templates/
    └── product.customizable.json
```

You can upload these files through your Shopify admin:
1. Go to **Online Store** → **Themes**
2. Click **Actions** → **Edit code**
3. Navigate to each directory and upload the corresponding files

### 2. Include CSS in Your Theme Layout

Add the following line to your theme.liquid file inside the `<head>` tag:

```liquid
{{ 'image-customizer.css' | asset_url | stylesheet_tag }}

{% if checkout %}
  {{ 'checkout-custom-image.js' | asset_url | script_tag }}
{% endif %}
```

### 3. Apply the Customizer to Products

Either:
- Use the product.customizable.json template for products you want to customize
- Or add the Image Customizer section to your product pages through the theme editor

## How It Works

1. **Customer Uploads an Image**: Through a simple drag-and-drop or file selection interface
2. **Editing**: The customer can crop, resize, and rotate their image
3. **Preview**: A live preview shows how the image will appear on the product
4. **Add to Cart**: The customized image is stored as line item properties
5. **Checkout**: The image data is attached to the order for fulfillment

## Customization

### Adjusting the Aspect Ratio

Change the aspect ratio in `snippets/image-customizer.liquid` (around line 115):

```js
aspectRatio: 1, // Change this to match your product requirements
```

### Styling

Modify the CSS in `assets/image-customizer.css` to match your theme's styling.

### Image Quality

Adjust the image quality settings in `snippets/image-customizer.liquid` (around line 157):

```js
maxWidth: 2000, // Maximum width for print quality
maxHeight: 2000, // Maximum height for print quality
fillColor: '#fff',
imageSmoothingEnabled: true,
imageSmoothingQuality: 'high'
```

## Processing Orders

When a customer places an order with a customized image:
1. The order will have a property called `_custom_image` with the image data
2. You can extract this data to download/print the customized image

## License

MIT License - Feel free to use and modify for your own Shopify store.

## Support

If you have questions or need help implementing this on your store, please open an issue in this repository.