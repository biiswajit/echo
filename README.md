<div align="center">

<picture>
  <img alt="logo" src="https://github.com/user-attachments/assets/43fc82dc-1039-4fe7-aff1-9600f07a5cdc">
</picture>

<h3>Open Source GPT Mapper</h3>

[Instagram](https://instagram.com/biswajitmalakarmeta) | [Website](https://linktr.ee/biiswajit) | [X](https://x.com/biswajittwt) | [LinkedIn](https://www.linkedin.com/in/biswajitin/)

</div>

## Project architecture

![IMG20250219000258](https://github.com/user-attachments/assets/53143061-adb0-47b0-a8c8-524b0a914665)

| Service | Working |
| :----: |-------------|
| `web` | this is the primary application for handling everying written in next.js |
| `worker` | simple express application to offload some taks from the primary application |
| `database` | persistant storage of information, i am using postgresql |
| `cache` | simple redis cache to store previous messages for faster retrival of messages |
| `queue` | radis queue (maybe i'll use other service) for storing jobs, message, and other information |
| `pub-sub` | for each response from llm provider worker will publish chunks in pub-sub, eventually from pub-sub web application will get the stream |
| `llm providers` | third party llm providers (i'll update the list of llms eventually) |
