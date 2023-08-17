from base64 import encode
import json
from logging import exception
from os import access, write
from re import I
from weakref import proxy
import requests
from urllib import parse
import time
from datetime import datetime
import psycopg2



headers = {
    'X-Api-App-Id':'v3.r.137082665.b59a2dfa03f4e04fbee55e3a47ca94cc7802a739.888a83c7be3f1d4de793ae5fbdd371deb9c05e2f',
    'Authorization': 'Bearer v3.r.137082665.ce6fa5105b44907ef314858d394498872efd4654.e385e172a8544b977abb9905e64bf7130374c0fb',
    'Content-Type': 'application/json;charset=utf-8'
    }
# url_code='https://www.superjob.ru/authorize/?client_id=2064&redirect_uri=https://api.superjob.ru/&state=custom'
# res_code=requests.get(url_code,headers=headers,allow_redirects=False)
# #print(res_code.url)
# code=parse.urlparse(res_code.url)
# #print(code.query)
# #data_code=res_code.json()
# #print(data_code)
access_url='https://api.superjob.ru/2.0/oauth2/refresh_token/?refresh_token=v3.r.137082665.ce6fa5105b44907ef314858d394498872efd4654.e385e172a8544b977abb9905e64bf7130374c0fb&client_id=2064&client_secret=v3.r.137082665.b59a2dfa03f4e04fbee55e3a47ca94cc7802a739.888a83c7be3f1d4de793ae5fbdd371deb9c05e2f'
res_access=requests.get(access_url,headers=headers)
##print(res_access)
data_access=res_access.json()
#print(data_access)
headers['Authorization']='Bearer '+str(data_access['access_token'])
##print(headers['Authorization'])
url='https://api.superjob.ru/2.0/vacancies/'
params={
    'town': '4',
    'catalogues':'603',
    'page':'0',
    'count':'100',

}

url_t='https://api.superjob.ru/2.0/towns?all=true&id_country=1'
res_t = requests.get(url_t,headers=headers)
data_t = res_t.json()
url_catalogues='https://api.superjob.ru/2.0/catalogues/'
res_catalogues = requests.get(url_catalogues,headers=headers)
data_catalogues = res_catalogues.json()

con = psycopg2.connect(
    database="postgres", 
    user="postgres", 
    password="qwe123", 
    host="127.0.0.1", 
    port="5432")
cur = con.cursor()

for town in data_t['objects']:
    params['town']=town['id']
    for cat in data_catalogues:
        for catolog in cat['positions']:
            params['page']=0
            k = 0
            while True:
                try:
                    params['catalogues']=catolog['key']
#                     time.sleep(1.5)
                    res = requests.get(url,headers=headers,params=params)
                    data = res.json()
                except Exception:
                    print(Exception)
                for count in range(100):
                    try:
                        ts = int(data['objects'][count]['date_published'])  
                        print(count, data['objects'][count]['profession'])
                        cur.execute('INSERT INTO UNITED_BASE (SITE, NAME, AREA, SALARY_FROM, SALARY_TO, SALARY_VAL, CREATED_AT, ARCHIVED, SHEDULE, ALTERNATE_URL) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT DO NOTHING;', ('SJ', str.lower(data['objects'][count]['profession']), data['objects'][count]['town']['title'], data['objects'][count]['payment_from'], data['objects'][count]['payment_to'], str.upper(data['objects'][count]['currency']), str(datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')), data['objects'][0]['is_closed'], str.lower(data['objects'][count]['type_of_work']['title']), data['objects'][count]['link']))
                        con.commit()
                        k +=1
#                         print(count)
                    except:
                        print(exception)
                        print('error')
                        break
                    
#                     
                params['page']+=1
                print('>>>', data['total'], k, params['page'])
                if k >= data['total']:
                    break

