from datetime import datetime, date, timedelta

def get_delivery_date():
    if datetime.now() > rotation_time():
        return datetime.now() - timedelta(days=date.today().weekday()-4)
    return datetime.now() - timedelta(days=date.today().weekday()-4, weeks=1)

def rotation_time():
    rotation_day = 2
    if date.today().weekday()  < rotation_day or (date.today().weekday() == rotation_day and datetime.now().time().hour < 18):
        week = 1
    week=0
    return datetime.now() - timedelta(days=date.today().weekday()-rotation_day, weeks=week, hours=datetime.now().time().hour - 18, minutes=datetime.now().time().minute)
    

def delivery_message():
    if datetime.now() > rotation_time() and (date.today().weekday() < 5 or date.today().weekday() > 2):
        return 'Доставим в следующую пятницу' 
    return 'Доставим в ближайшую пятницу'
