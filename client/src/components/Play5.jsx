import { useDispatch } from 'react-redux';
import { traerPS5 } from '../actions';

export const Play5 = () => {
    const dispatch = useDispatch();

    const ps5 = () => {
        console.log('click');
        dispatch(traerPS5('PlayStation 5'));
    };

    return (
        <>
            <button onClick={() => ps5()}>PS5</button>
        </>
    );
};
