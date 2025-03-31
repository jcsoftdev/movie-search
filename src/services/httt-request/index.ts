import axios from 'axios'

export abstract class AbstractHttpRequest {
  abstract get<T>(url: string): Promise<T>
  abstract post<T>(url: string, body: unknown): Promise<T>
  abstract put<T>(url: string, body: unknown): Promise<T>
  abstract delete<T>(url: string): Promise<T>
}

export class HttpRequest {
  constructor(private readonly http: AbstractHttpRequest) {}

  async get<T>(url: string): Promise<T> {
    return this.http.get<T>(url)
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return this.http.post<T>(url, body)
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    return this.http.put<T>(url, body)
  }

  async delete<T>(url: string): Promise<T> {
    return this.http.delete<T>(url)
  }
}

export class FetchHttpRequest extends AbstractHttpRequest {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    return response.json() as Promise<T>
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json() as Promise<T>
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json() as Promise<T>
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
    })
    return response.json() as Promise<T>
  }
}

export class AxiosHttpRequest extends AbstractHttpRequest {
  async get<T>(url: string): Promise<T> {
    return (await axios.get<T>(url)).data
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return (await axios.post<T>(url, body)).data
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    return (await axios.put<T>(url, body)).data
  }

  async delete<T>(url: string): Promise<T> {
    return (await axios.delete<T>(url)).data
  }
}

export const fetchHttpRequest = new FetchHttpRequest()
export const axiosHttpRequest = new AxiosHttpRequest()

export const httpRequest = new HttpRequest(axiosHttpRequest)
