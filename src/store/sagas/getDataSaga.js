import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_API_DATA, receiveApiData } from '../actions/requestData';

export const fetchData = async () => {
  try {
    // const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getDataSaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
