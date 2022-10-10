from cmath import exp
from datetime import date, timedelta


def get_age(dob):
    try:
        return (date.today() - dob) // timedelta(days=365.2425)
    except Exception as e:
        return 0
