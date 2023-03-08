"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
 """
from app import app, Config
# from flask import render_template, request, redirect, url_for, flash,  session,  send_from_directory,  abort 

from flask import render_template, request, redirect, url_for, flash, session, send_from_directory, abort , jsonify
from werkzeug.utils import secure_filename 
from werkzeug.security import check_password_hash
 
from os import getcwd
from os.path import join

from app import app, Config, Mqtt, DB
from .function import DB, Mqtt
# Add instance of Database class below

#Create instance of Database class
mongo = DB(Config)


###
# Routing for your application.
###


@app.route('/dashboard')
def dashboard():
    """Render website's dashboard."""
    return render_template('dashboard.html', name="my Dashboard")

@app.route('/calc')
def calc():
    """Render website's calc page."""
    return render_template('calc.html', name="my Calc System")

@app.route('/about')
def about():
    """Render website's About page."""
    return render_template('about.html', name="my Home Automation System")

 


@app.route('/')
def home():
    """Render website's home page."""
    return render_template('home.html')


# Add other routes below

@app.route('/data', methods=["GET"])
def data():
    """ Return data """
    if request.method == "GET":
        # Process GET requests
        VARIABLE = request.args.get("variable")
        START = int(request.args.get("start"))
        END = int(request.args.get("end"))
        data = mongo.plotStaticGraph(VARIABLE,START, END)

        return jsonify(data) 
    return render_template('404.html'), 404

 
@app.route('/text', methods=["GET","POST"])
def text():
    """Returns text"""
    if request.method == "GET":
        # Process GET requests
        return "Hello World!."
    
    if request.method == "POST":
        # Process POST requests
        return "Hello World!."
    return render_template('404.html'), 404


@app.route('/json', methods=["GET","POST"])
def json_object():
    """Returns Json object"""
    if request.method == "GET":
        # Process GET requests
        message = {"status":"GET request received"}
        return jsonify(message)
    if request.method == "POST":
        # Process POST requests
        message = {"status":"POST request received"}
        return jsonify(message) 
    
    return render_template('404.html'), 404


@app.route('/file/<name>', methods=["GET"])
def file_stored(name):
    """Returns a file"""
    if request.method == "GET":
        # Process GET requests
        path = join( getcwd(),Config.SYSFILES) 
        return send_from_directory( path, name)

    return render_template('404.html'), 404

@app.route('/sum/<firstnumber>/<secondnumber>', methods=["GET"])
def sumTwoNumbers(firstnumber, secondnumber):
    """Return the Sum of two numbers"""
    if request.method == "GET":
        # Process GET requests 
        summedNumbers = int(firstnumber) + int(secondnumber)
        return f"The sum of {firstnumber} and {secondnumber} is {summedNumbers}"   
    return render_template('404.html'), 404

@app.route('/sum', methods=["GET"])
def sum2Numbers():
    """Return the Sum of two numbers"""
    if request.method == "GET":
        # Process GET requests
        num1 = request.args.get("number1")
        num2 = request.args.get("number2")
        summedNumbers = int(num1) + int(num2)
        return f"Answer: The sum of {num1} and {num2} is {summedNumbers}"
    return render_template('404.html'), 40

@app.route('/mul', methods=["POST"])
def mul2Numbers():
    """Return the Product of two numbers"""
    if request.method == "POST":
        # Process GET requests 
        data = request.get_json()
        num1 = data["number1"]
        num2 = data["number2"]
        mulNumbers = int(num1) * int(num2)
        return f"Answer: The product of {num1} and {num2} is {mulNumbers}"
    return render_template('404.html'), 404

@app.route('/tempC', methods=["POST"])
def temp2Numb():
    """Return the Temperature Conversion of a number"""
    if request.method == "POST":
        # Process GET requests 
        data = request.get_json()
        numb1 = data["number1"]
        # num2 = data["number2"]
        faren = (int(numb1) * 1.8)+32
        return f"Answer: {numb1}°C is {faren}°F"
    return render_template('404.html'), 404


###
# The functions below should be applicable to all Flask apps.
###


# Flash errors from the form if validation fails
def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
