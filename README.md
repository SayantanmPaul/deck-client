# Deck: A real-time Communication Platform

![Deck_ Next_js](https://github.com/user-attachments/assets/f346b34b-8304-4667-b6a2-0e4042f5a9d0)

#### Demo Link: [Click here](https://deck-app.vercel.app/)
#### Backend Server Files : [Click here](https://github.com/SayantanmPaul/deck-server)


## Key Features and Development Insights: 

- **Real-time messaging: U**tilised pusher subscriptions and websockets to enable instant delivery and update across all connected users.
- **Connecting users as friends:** Users can send, receive, and accept friend requests via email, facilitating direct communication once the request is accepted.
- **Secure Authentication:** Maintain secure custom authentication using JWT(JSON Web Token) implementing accssToken update and verify each time with refreshToken.
- **Multi-media sharing:** User can share media(photos, videos, audios and documents) files alongside messages, enhancing versatility in conversations.
- **API Design:** **:** Developed a RESTful API backend using Node.js and Express, enabling CRUD operations for users, messages, and conversations.
- **Engaging Responsive UI:** The platform can be viewed on desktops, laptops, tablets as well as smartphones.
- **Databases and Cloud Storage:** Managed and stored user data and messages using MongoDB and Redis, and integrated Cloudinary for secure media file storage.

 ![Deck_Sign In](https://github.com/user-attachments/assets/72017709-bfa9-4dce-862a-6066b69c2437)
 
 ![Deck_Dashboard](https://github.com/user-attachments/assets/4de5457b-7192-42a8-81b1-d6bb565e9e37)
 
 ![Deck_Friend Requests](https://github.com/user-attachments/assets/b9fc457f-c817-478d-8e83-1fcacc9632c6)
   
## Getting Started

To clone and run this application locally, follow these steps:

1. Clone the frontend repository and install dependencies:
   ```bash
   git clone https://github.com/SayantanmPaul/deck-frontend.git
   cd deck-frontend
   npm i
   ```

2. Set up environment variables for the frontend as described:
    ```
    PUSHER_APP_ID = <your-pusher-app-id>
    NEXT_PUBLIC_PUSHER_APP_KEY = <your-pusher-app-key>
    PUSHER_APP_SECRET = <your-pusher-app-secret>
    ```


3. Clone the backend repository and install dependencies:
   ```bash
   git clone https://github.com/SayantanmPaul/deck-server.git
   cd deck-server
   npm i
   ```

4. Set up environment variables for the backend as described:
    ```
    # Server Configuration
    PORT = <your_port_number>                   # e.g., 5000
    ORIGIN_PATH= http://localhost:3000          # or <your_frontend_url>
    DB_URL= <your_mongodb_url>                  
    JWT_SECRET= <jwt_secret>                    
    REFRESH_TOKEN_SECRET= <refresh_token_secret>
    
    REDIS_URL= <upstash_redis_connection_url>
    UPSTASH_REDIS_REST_URL= <your_redis_app_rest_url>
    UPSTASH_REDIS_REST_TOKEN= <redis_app_token>

    PUSHER_APP_ID = <pusher_app_id>
    PUSHER_APP_KEY= <pusher_app_public_key>
    PUSHER_APP_SECRET= <pusher_app_secret>
    PUSHER_APP_CLUSTER= "ap2"

    CLOUDINARY_CLOUD_NAME= <your_cloudinary_storgae_name>
    CLOUDINARY_API_KEY= <your_cloudinary_api_key>
    CLOUDINARY_API_SECRET= <your_cloudinary_api_secret>
    ```

5. Make Sure your MongoDB service is running.

6. Start both the frontend and backend servers:
   - **Frontend:** `npm run dev`
   - **Backend:** `npm run start:nodemon`

