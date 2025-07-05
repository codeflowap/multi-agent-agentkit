import gradio as gr
import requests

API_URL = "http://localhost:3000/api/inngest"

def talk_to_sunCore(user_input):
    try:
        response = requests.post(
            API_URL,
            json={
                "name": "sunCore-sme-demo/default",  # <-- function trigger name
                "data": { "input": user_input }
                },
            timeout=20
        )
        if response.status_code == 200:
            return response.json()
        else:
            return f"❌ Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"⚠️ Exception: {str(e)}"

with gr.Blocks() as demo:
    gr.Markdown(""" #SunCore SME Assistant
Enter a business request (e.g. campaigns based on NPS or products) and see how SunCore SME agents respond.""")

    with gr.Row():
        user_input = gr.Textbox(label="Your Input", placeholder="e.g. suggest July campaigns based on NPS")
    output = gr.Textbox(label="Response")

    btn = gr.Button("Ask SunCore")
    btn.click(fn=talk_to_sunCore, inputs=user_input, outputs=output)

if __name__ == "__main__":
    demo.launch()