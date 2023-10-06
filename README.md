# Angular News App

This Angular application integrates with a .NET Core backend to fetch and display the newest stories from a news feed. Users can view a paginated list of stories, search for specific stories, and enjoy automated updates.

## Features

1. **List of Newest Stories:**
   - Display a paginated list of the newest stories from the news feed.

2. **Story Details:**
   - Each list item includes the title and a link to the news article.

3. **Search Feature:**
   - Users can search for stories based on titles or URLs.

4. **Pagination:**
   - Implement a paging mechanism to manage the number of stories per page.

5. **Automated Updates:**
   - Utilize automated polling to refresh and fetch new stories at regular intervals.

## Project Structure

- **`src/app/news/`:** Contains the Angular component, service, and related files for managing news.

- **`src/app/services/`:** Holds the Angular service for communicating with the .NET Core backend.

## Installation

1. Clone the repository:

   ```bash
   git clone  https://github.com/abhinav-wase/HackerAPI_Angular.git
   (https://github.com/abhinav-wase/HackerAPI_Angular/tree/V1.0)
2. Navigate to the project directory:

```bash
cd HackerApi-App
```

3. Install dependencies:

```bash
npm install
```

# Usage

Run the Angular application:

```bash
ng serve
```

Open your browser and navigate to http://localhost:4200/ to access the application.

![image](https://github.com/abhinav-wase/HackerAPI_Angular/assets/62688135/871d3269-80bf-4354-864f-18bc42a44e4d)


# Configuration

Set the API URL in the NewsServiceService (src/app/services/news.service.ts) to point to your .NET Core backend:

```typescript
private apiUrl = 'https://your-dotnet-api-url/api/News';
```

# Tests

Run the unit tests using the following command:

```bash
ng test
```

![image](https://github.com/abhinav-wase/HackerAPI_Angular/assets/62688135/da4f5683-1546-48f2-9797-f2279027a9c6)


# Technologies Used
Angular
.NET Core
HttpClient
RxJS
Jasmine and Karma for testing
Contributing
Feel free to contribute to this project. Submit issues or pull requests as needed.

License
This project is licensed under the MIT License - see the LICENSE file for details.
