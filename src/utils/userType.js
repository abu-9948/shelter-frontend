import axios from "axios";

export const getUserType = async (accommodationId, userId, reviewId = null) => {
    try {
        const accommodationsResponse = await axios.get(
            `${process.env.REACT_APP_ACCOMMODATION}/by-user/${userId}`
        );
        
        const isOwner = accommodationsResponse.data.some(
            accommodation => accommodation._id === accommodationId
        );

        if (isOwner) return 'Owner';

        if (reviewId) {
            const reviewsResponse = await axios.get(
                `${process.env.REACT_APP_REVIEWS}/get-review/${accommodationId}`
            );

            const isAuthor = reviewsResponse.data.some(
                review => review.review_id === reviewId && review.user_id === userId
            );

            if (isAuthor) return 'Author';
        }

        return null;

    } catch (error) {
        console.error('Error determining user type:', error);
        return null;
    }
};