# Programming with Representation (PwR)

PwR allows you to make changes with just natural language (NL): Describe your change in simple NL and see the LLM make laser sharp edits across the entire stack. Click here for more information [aka.ms/IGotPwR](https://aka.ms/IGotPwR)

## Teams App Stack

We have described our Teams App as a project that has 2 layers:

1. Adaptive Cards UI
2. API 

(note: PwR is generic and can support any number of layers, any number of files and any number of languages)

## Developer notes

1. Pre-requisites
    1. Python3.10
    2. Poetry
    3. Gemfury key to get the `pwr` package. You can get this from a PwR Team member
    4. OpenAI API Key with access to both GPT3.5 and GPT4
2. One-time Setup:
    1. Setup Poetry shell
        ```
        $poetry shell
        ```
    2. Add Gemfury key
        ```
        $poetry config http-basic.fury <TOKEN> NOPASS
        ```
    3. Install all the dependencies
        ```
        $poetry install
        $poetry update
        ```
    4. Add `.env` file
        ```
        OPENAI_API_KEY=<key>
        # If you are using Azure OpenAI uncomment the following rows
        # OPENAI_API_BASE="https://XXXXXXX.azure-api.net"
        # OPENAI_API_TYPE="azure"
        # OPENAI_API_VERSION="2023-03-15-preview"
        
        # Change the deployement id if they are different
        FAST_LLM_MODEL_NAME=gpt-3.5-turbo
        SLOW_LLM_MODEL_NAME=gpt-4

        # Change these time outs depending on your rate limiting budget
        LLM_TIME_OUT_MULTIPLIER=10
        LLM_TIME_OUT_MAX=60
        LLM_MAX_RETRY=3
        ```
3. Run the PwR agent
    ```
    $poetry run python3 main.py --change <natural language change>
    ```
