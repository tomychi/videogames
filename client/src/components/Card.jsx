export const Card = ({ name, image, rating, genres }) => {
    // saco los undefined del array
    const genresFiltered = genres.filter((g) => g !== undefined);

    // saco los objetosdel array
    const genresFiltered2 = genresFiltered.filter((g) => typeof g !== 'object');

    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='200px' height='250px' />
            <h5>Rating: {rating}</h5>
            <h5>Genres: {genres && genresFiltered2.join(', ')}</h5>
        </div>
    );
};
