import psycopg2
from base64 import encode
import json
from logging import exception
from os import write
from re import I
from weakref import proxy
import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import psycopg2
import time

def parse():
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    res = requests.get("https://api.hh.ru/vacancies?per_page=100",headers=headers)
    data = res.json()

    url_spec = 'https://api.hh.ru/professional_roles'
    res_spec =requests.get(url_spec)
    data_spec=res_spec.json()

    url_area = 'https://api.hh.ru/areas'
    res_area =requests.get(url_area)
    data_area=res_area.json()

    con = psycopg2.connect(
        database="postgres", 
        user="postgres", 
        password="qwe123", 
        host="127.0.0.1", 
        port="5432")
    cur = con.cursor()
    a=0
    num=0
    for area in data_area:
        for item_area in area['areas']:
            for spec in data_spec['categories']:
#                 time.sleep(10)
                for item_in_spec in spec['roles']:
#                     time.sleep(5)
                    try:
                        while num<data['pages']:
                            url = 'https://api.hh.ru/vacancies?per_page=100&page='+str(num)+'&area='+str(item_area['id'])+'&professional_role='+str(item_in_spec['id'])
                            res = requests.get(url)
                            data = res.json()
                            for vack in data['items']:

    #                             print(vack)
#                                 print(vack['name'])
#                                 print(vack['area']['name'])
                                if vack['salary'] is not None:
#                                     print( vack['salary']['from'], vack['salary'])
#                                     print( vack['salary']['from'], vack['salary']['currency'])
                                    cur.execute('INSERT INTO UNITED_BASE (SITE, NAME, AREA, SALARY_FROM, SALARY_TO, SALARY_VAL, CREATED_AT, ARCHIVED, SHEDULE, ALTERNATE_URL) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT DO NOTHING;', ('hh', str.lower(vack['name']), vack['area']['name'], vack['salary']['from'], vack['salary']['to'],str.upper(vack['salary']['currency']), vack['created_at'], vack['archived'], str.lower(vack['schedule']['name']), vack['alternate_url']))
                                    con.commit()            
                                else:
                                    pass
#                                     print('з/п не указана')
                                    cur.execute('INSERT INTO UNITED_BASE (SITE, NAME, AREA, CREATED_AT, ARCHIVED, SHEDULE, ALTERNATE_URL) VALUES (%s, %s, %s, %s, %s, %s, %s) ON CONFLICT DO NOTHING;', ('HH', str.lower(vack['name']), vack['area']['name'], vack['created_at'], vack['archived'], str.lower(vack['schedule']['name']), vack['alternate_url']))            
                                    con.commit()
#                                 print(vack['created_at'])
#                                 print(vack['archived'])
#                                 print(vack['schedule']['name'])
#                                 print(vack['alternate_url'])
                                a+=1
                                print(a)
                                if a >= 1000000:
                                    con.close()
                                    return a
                            num+=1
                        num=0
                    except KeyError as e:
                        print(e)
                        print('end parse')
    con.close()
    print(a)

def create_bd():
    con = psycopg2.connect(
      database="postgres", 
      user="postgres", 
      password="qwe123", 
      host="127.0.0.1", 
      port="5432"
    )
    cur = con.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS UNITED_BASE  
         (
        SITE TEXT NOT NULL,
        NAME TEXT NOT NULL,
        AREA TEXT NOT NULL,
        SALARY_FROM INTEGER,
        SALARY_TO INTEGER,
        SALARY_VAL VARCHAR(3),
        CREATED_AT DATE,
        ARCHIVED BOOLEAN NOT NULL,
        SHEDULE TEXT,
        ALTERNATE_URL TEXT NOT NULL,
        PRIMARY KEY (ALTERNATE_URL));''')
    con.commit()  
    con.close()
    
#create_bd()
print(parse())