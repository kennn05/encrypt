import openai
import time

print("""
      
 __      __                      ________        __       
/  \    /  \___________  _____  /  _____/_______/  |_      
\   \/\/   /  _ \_  __ \/     \/   \  ___\____ \   __\       
 \        (  <_> )  | \/  Y Y  \    \_\  \  |_> >  |         
  \__/\  / \____/|__|  |__|_|  /\______  /   __/|__|       
       \/                    \/        \/|__|                 
                                                        
    
""")


# Replace 'YOUR_API_KEY' with your actual OpenAI API key
openai.api_key = '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'

class ChatBot:
    def __init__(self):
        self.conversation_history = ""
        self.topics_discussed = set()

    def generate_response(self, message):
        try:
            response = openai.Completion.create(
                engine="text-davinci-002",
                prompt=message,
                max_tokens=3000
            )

            complete_response = response.choices[0].text.strip()
            while response['choices'][0]['finish_reason'] == 'incomplete':
                response = openai.Completion.create(
                    engine="text-davinci-002",
                    prompt=message + complete_response,
                    max_tokens=3000
                )
                complete_response += response.choices[0].text.strip()

            return complete_response
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return f"Sorry, I'm having trouble processing your request."

    def send_message(self, user_input):
        self.conversation_history += f"You: {user_input}\n"
        response = self.generate_response(self.conversation_history)
        self.conversation_history += f"{response}\n"
        self.topics_discussed.update(self.extract_topics(user_input))

        return response

    def extract_topics(self, input_text):
        words = input_text.lower().split()
        topics = [word for word in words if len(word) > 3]
        return topics

if __name__ == "__main__":
    chat_bot = ChatBot()

    while True:
        user_input = input("\033[32mYou:\033[0m ")  # Set user input color to green
        response = chat_bot.send_message(user_input)
        print("\033[31m" + response + "\033[0m")  # Set chatbot response color to red
