from bs4 import BeautifulSoup
import requests
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def scrape():
    url=request.args['link']
    soup = BeautifulSoup(requests.get(url).text)
    for script in soup(["script", "style"]):
        script.extract()
    return soup.get_text()   

if __name__ == '__main__':
    app.run(host='0.0.0.0')
