import { Axios } from 'axios';
import useRef from 'react'
import genres from "./genres.json";


const MoviesModal = () => {
// const [movies,setMovies] = useState([])

// const inputRef = useRef(null);

// const varRef = useRef(movies.length);

// useEffect(()=> {
//     inputRef.current.focus();

//     Axios.get(
//       "https://api.themoviedb.org/3/discover/movie?with_genres=$35&api_key=d38aa8716411ef7d8e9054b34a6678ac"
//     ).then(res=> {
//         setMovies(res.data)
       
//     })
// },[]);

// useEffect(()=> {
//     varRef.current = varRef.current + 1;
// })




// return movies.map((movies, index) => (
//   <img
//     alt=""
//     src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
//     index={index}
//     key={index}
//   />
// ));


}

export default MoviesModal;