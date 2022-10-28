from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

# initializations
app = Flask(__name__)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'clinica2'
mysql = MySQL(app)

# settings
app.secret_key = "mysecretkey"

# routes


@app.route('/')
def Index():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM contacts')
    data = cur.fetchall()
    cur.close()
    return render_template('index.html', contacts = data)

@app.route('/add_contact', methods=['POST'])
def add_contact():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        rut = request.form['rut']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        ciudad = request.form['ciudad']
        email = request.form['email']
        born = request.form['born']
        ecivil= request.form['ecivil']
        comentarios = request.form['comentarios']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO contacts (nombre, apellido, rut, telefono, direccion, ciudad, email, born, ecivil, comentarios ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (nombre, apellido, rut, telefono, direccion, ciudad, email,born,ecivil,comentarios))
        mysql.connection.commit()
        flash('PACIENTE AGREGADO A LA FICHA MEDICA')
        return redirect(url_for('Index'))

@app.route('/edit/<id>', methods = ['POST', 'GET'])
def get_contact(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM contacts WHERE id = %s', (id))
    data = cur.fetchall()
    cur.close()
    print(data[0])
    return render_template('edit-contact.html', contact = data[0])

@app.route('/update/<id>', methods=['POST'])
def update_contact(id):
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        rut = request.form['rut']
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE contacts
            SET nombre = %s,
                apellido = %s,
                rut = %s
            WHERE id = %s
        """, (nombre, apellido, rut, id))
        flash('Contact Updated Successfully')
        mysql.connection.commit()
        return redirect(url_for('Index'))

@app.route('/delete/<string:id>', methods = ['POST','GET'])
def delete_contact(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM contacts WHERE id = {0}'.format(id))
    mysql.connection.commit()
    flash('PACIENTE BORRADO DE LA FICHA MEDICA')
    return redirect(url_for('Index'))

# levantar app en puerto 3000 con debug en true para plaicar cambios en vivo
if __name__ == "__main__":
    app.run( debug=True)