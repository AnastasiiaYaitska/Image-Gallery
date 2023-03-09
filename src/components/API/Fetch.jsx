export function fetchApi(keyWord, page) {
    const API_KEY = '34071478-f5a1156945b7b353a5d87beca';
 const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';
    return fetch(`${BASE_URL}&key=${API_KEY}&page=${page}&q=${keyWord}`)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();               
            }
            console.log('error')
            return Promise.reject(new Error(`Incorrect request ${keyWord} `))
        });
}