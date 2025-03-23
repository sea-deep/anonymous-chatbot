# Anonymous Chatbot

This is an anonymous chatbot built using Telegraf, a library for creating Telegram bots. The bot allows users to start anonymous chats with random partners.

## Features

- **/start**: Start the bot and get a welcome message.
- **/search**: Search for a new chat partner.
- **/next**: Skip the current chat and search for a new one.
- **/end**: End the current chat.
- **/help**: See the available commands.

## How It Works

1. **/start**: Initializes the bot and provides instructions to the user.
2. **/search**: Puts the user in a queue to find a chat partner. If another user is already waiting, it pairs them up.
3. **/next**: Allows the user to skip the current chat and search for a new partner.
4. **/end**: Ends the current chat and removes both users from the chat.
5. **/help**: Lists all available commands and their descriptions.

## Hosting the Bot

To host the bot yourself, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/sea-deep/anonymous-chatbot.git
    cd anonymous-chatbot
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your Telegram bot token:
    ```env
    BOT_TOKEN=your-telegram-bot-token
    ```

4. **Build the project**:
    ```sh
    npm run build
    ```

5. **Start the bot**:
    ```sh
    npm start
    ```

## Template Repository

This project was created using the following template repo: [Telegraf Bot Template](https://github.com/sea-deep/telegraf-bot-template).

## License

This project is licensed under the MIT License.