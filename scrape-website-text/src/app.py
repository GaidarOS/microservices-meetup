from bs4 import BeautifulSoup
import requests
from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/', methods=['GET','POST'])
@cross_origin()
def scrape():
    url=request.args['link']
    soup = BeautifulSoup(requests.get(url).text)
    for script in soup(["script", "style"]):
        script.extract()
    return soup.get_text()   

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=6100)
