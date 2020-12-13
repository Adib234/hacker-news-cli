import fire
import requests
from datetime import datetime


def get_top_stories():
    r = requests.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')

    return r.json()


def filtered_top():
    json = get_top_stories()
    return_array = []
    json = json[:10]
    for id in json:

        new_request = requests.get(
            'https://hacker-news.firebaseio.com/v0/item/{id}.json?print=pretty'.format(id=id))

        unix_time = new_request.json()['time']
        time = datetime.utcfromtimestamp(
            unix_time).strftime('%Y-%m-%d %H:%M:%S')

        title = new_request.json()['title']
        url = new_request.json()['url']
        score = new_request.json()['score']

        return_array.append([title, score, url, time])

    return return_array


def get_new_top():
    json = get_top_stories()
    return


if __name__ == '__main__':
    fire.Fire(filtered_top())
