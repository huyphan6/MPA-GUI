import sqlite3
from flask import g

connection = sqlite3.connect('database.db')

with open('./schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO users VALUES (1, huy, phan, huy21@gmail.com, huyness, 123456)",
            ('First Post', 'Content of first post')
    )

connection.commit()
connection.close()