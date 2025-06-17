# ----------------------------------------------------------
# Importing all required libraries for this Flask Project.
# ----------------------------------------------------------
from flask import Flask, Blueprint, render_template, request, url_for, redirect, make_response, session, g
import os

# ----------------------------------------------------------
# Doing initial setup for certain aspects of the project.
# ----------------------------------------------------------
dir_path = os.path.dirname(os.path.realpath(__file__))
app = Flask(__name__)


# ----------------------------------------------------------
# Root initializations for the Flask Project.
# ----------------------------------------------------------
@app.route('/')
def indexPage():
    return render_template('index.html')


# ----------------------------------------------------------
# Creates parameters for the application to run.
# ----------------------------------------------------------
if __name__ == '__main__':
	app.run(
          debug=True,
          host='0.0.0.0',
          port=5000
          )