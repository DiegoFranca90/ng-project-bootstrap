import {HttpClient} from "@angular/common/http";
import {InjectionToken} from "@angular/core";
import {BaseEntity, Pagination} from "../../core/interfaces";

export const BaseServiceToken = new InjectionToken<BaseService<any>>("ServiceBase");

export class BaseService<T extends { id?: any }> {

  constructor(protected http: HttpClient, protected controller: string) {
  }

  /**
   * @description Convert or sanitize a query string received
   * @param query string or object
   * @return string
   */
  toQuery(query: object | string): string {

    if (typeof query === "object") {
      const urlQuery = new URLSearchParams();
      const keys = Object.keys(query);
      keys.forEach(key => {
        if (query[key]) {
          urlQuery.append(key, query[key]);
        }
      });
      return `?${urlQuery.toString()}`;
    } else if (typeof query === "string") {
      if (query.trim().substring(0, 1) !== "?") {
        query = `?${query.trim()}`;
      }
      return query.length > 1 ? query : "";
    }
    return "";
  }

  async get<QT>(id: string, query?: string | object): Promise<QT>;
  async get(id: number, query?: string | object): Promise<T>;
  async get(id?: string, query?: string | object): Promise<Array<T>>;
  async get(id: any = '', query?: string | object): Promise<any> {
    const append = this.toQuery(query);
    if (typeof id === "number") {
      return await this.http.get<T>(`${this.controller}/${id}${append}`).toPromise();
    }
    return await this.http.get<Array<T>>(`${this.controller}/${id}${append}`).toPromise();
  }

  async page<TQ>(page: number, query?: string | object): Promise<Pagination<TQ>>;
  async page(page: number, query?: string | object): Promise<Pagination<T>> {
    return await this.get(`Page/${page}`, query);
  }

  async edit<QT>(id: string, query?: string): Promise<QT> {
    return this.get<QT>(`${id}/Edit`, query);
  }

  async create(data: any, query?: string | object): Promise<any> {
    const append = this.toQuery(query);
    return await this.http.post<T>(`${this.controller}/${append}`, data).toPromise();
  }


  async update(data, query?: string | object): Promise<any> {
    const append = this.toQuery(query);
    return await this.http.put<T>(`${this.controller}/${append}`, data).toPromise();
  }

  async save(data: BaseEntity, query?: string): Promise<any> {
    return await ((data.id && data.id > 0) ? this.update(data, query) : this.create(data, query));
  }

  async delete(id: any): Promise<any> {
    return await this.http.delete(`${this.controller}/?id=${id}`).toPromise();
  }


}
