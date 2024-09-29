## Deck: A real-time Communication Platform

#### Demo Link: [Click here](https://deck-app.vercel.app/)
#### Backend Server Files : [Click here](https://github.com/SayantanmPaul/deck-server)

### Getting Started

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
    ```

5. Make Sure your MogoDB service is running.

6. Start both the frontend and backend servers:
   - **Frontend:** `npm run dev`
   - **Backend:** `npm run start:nodemon`

