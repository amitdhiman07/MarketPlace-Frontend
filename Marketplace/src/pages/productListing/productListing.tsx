import { useState } from 'react';
import './ProductListing.css';

interface ProductListingProps {
    onClose: () => void;
}

function ProductListing({ onClose }: ProductListingProps) {
    const [images, setImages] = useState<File[]>([]);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Limit to 5 images
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2 className="modal-title">Create a New Listing</h2>
                <form className="product-listing-form">
                    <div className="form-grid">
                        {/* Left Column: Images */}
                        <div className="image-section">
                            <div className="form-group" style={{ '--form-group-index': 0 } as React.CSSProperties}>
                                <label htmlFor="images">Upload Images (Max 5)</label>
                                <input
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    multiple
                                    className="file-input"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="image-preview">
                                {images.length > 0 ? (
                                    images.map((image, index) => (
                                        <div key={index} className="image-preview-item">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                className="preview-image"
                                            />
                                            <button
                                                type="button"
                                                className="remove-image-button"
                                                onClick={() => removeImage(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-images">No images uploaded</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Form Fields */}
                        <div className="details-section">
                            <div className="form-group" style={{ '--form-group-index': 1 } as React.CSSProperties}>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Enter product title"
                                    className="search-input"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ '--form-group-index': 2 } as React.CSSProperties}>
                                <label htmlFor="category">Category</label>
                                <select id="category" className="search-select" required>
                                    <option value="">Select Category ▼</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home-garden">Home & Garden</option>
                                    <option value="sports">Sports</option>
                                    <option value="books">Books</option>
                                    <option value="vehicles">Vehicles</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ '--form-group-index': 3 } as React.CSSProperties}>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    placeholder="$0.00"
                                    className="search-input"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ '--form-group-index': 4 } as React.CSSProperties}>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Describe your product"
                                    className="textarea-input"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ '--form-group-index': 5 } as React.CSSProperties}>
                                <label htmlFor="location">Location</label>
                                <select id="location" className="search-select" required>
                                    <option value="">Select Location ▼</option>
                                    <option value="new-york">New York</option>
                                    <option value="los-angeles">Los Angeles</option>
                                    <option value="chicago">Chicago</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="search-button modal-submit-button">
                            Post Listing
                        </button>
                        <button
                            type="button"
                            className="cta-button sign-in cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductListing;