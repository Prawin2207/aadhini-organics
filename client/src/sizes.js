// Index of the size a product is shown with by default (its regular pack size).
export const defaultSizeIndex = (product) => Math.max(0, product.sizes.findIndex((s) => s.default));

export const discount = (size) => Math.round((1 - size.price / size.mrp) * 100);
