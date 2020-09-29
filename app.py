# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 13:33:54 2019

@author: IMGADMIN
"""

from flask import Flask, render_template,request,redirect,url_for
import re,base64,time
from PIL import Image
from io import BytesIO
import os
app = Flask(__name__)


def getI420FromBase64(codec, image_path="E:/Hacks/cam_scanner/static/"):
    #print("1")
    base64_data = re.sub('^data:image/.+;base64,', '', codec)
    #print("2")
    byte_data = base64.b64decode(base64_data)
    #print("3")
    image_data = BytesIO(byte_data)

    img = Image.open(image_data)

    img_final_path='target_image' + '.png'
    img.save(image_path + img_final_path, "PNG")
    return img_final_path

@app.route('/download',methods=['POST','GET'])
def download():
   codec=request.form['custId']
   a=getI420FromBase64(codec)
   return "hi"#,tree=make_tree(path),result=pathh)

@app.route('/')
def hello():
    return render_template("camera.html")


if __name__ == '__main__':
    app.run(host="localhost",debug=True)
