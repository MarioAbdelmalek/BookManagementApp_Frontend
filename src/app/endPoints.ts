//In a real-world scenario, the part https://localhost:44324 would typically be stored in 
//a configuration file or environment variables, allowing the application to adjust the URL 
//based on whether it's running in a development or production environment.

export const Configuration = {
    APIs: {
        Books: {
            GetAllBooks: 'https://localhost:44324/api/Books',
            AddNewBook: 'https://localhost:44324/api/Books',
            UpdateBook: 'https://localhost:44324/api/Books/',
            DeleteBookByID: 'https://localhost:44324/api/Books/'
        }
    }
}