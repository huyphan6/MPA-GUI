from flask import current_app, g
import click
from server import get_db, close_db
import sqlite3

def init_db():
    db = get_db()

    with current_app.open_resource('./schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

connection = sqlite3.connect('database.db')

cur = connection.cursor()

create_table = """CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
);"""

cur.execute(create_table);

cur.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)",
            ('First Post', 'Content of first post')
    )

connection.commit()
connection.close()