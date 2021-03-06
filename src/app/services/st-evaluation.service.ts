import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Settings } from 'src/app/interfaces/settings';
import { Layer } from 'src/app/interfaces/layer';
import { GeoJsonObject } from 'geojson';
import { Status } from '../interfaces/status';




const httpOptions = {
  
  params: null
};

@Injectable({
  providedIn: 'root'
})
export class StEvaluationService {

  constructor(private http: HttpClient) { }

  postLayer(saId: number, layersData: number[], filtersData: number[], settingsData: string, id: number): Observable<any> {
    try {
      let body = new HttpParams();
      body = body.set('studyArea', saId.toString());
      body = body.set('settings', settingsData);
      body = body.set('joinMethod', id.toString());
      layersData.forEach((item) => {
        body = body.append('layers', item.toString());
      });
      filtersData.forEach((item) => {
        body = body.append('filters', item.toString());
      });
      return this.http.post<any>('/action?action_route=LayersSTHandler&action=index_values', body).pipe(
                  map(res => res as any)
                );
    } catch (e) {
      console.log(e);
    }
  }

  postStdArea(id: any): Observable<any> {
    let body = new HttpParams();
    body = body.set('study_area', id.toString());
    return this.http.post<any>('/action?action_route=evaluate_distances', body).pipe(
      map(res => res as any)
    );
  }

  statusEvaluateST(id: any): Observable<Status[]> {
    httpOptions.params = {
      study_area: id
    };
    return this.http.get<any>('/action?action_route=evaluate_distances', httpOptions).pipe(
      map(res => res as Status[])
    );
  }

  getDistanceLayers(id: any): Observable<any[]> {
    httpOptions.params = {
      study_area: id
    };
    return this.http.get<any>('/action?action_route=evaluate_distances_new_layers', httpOptions).pipe(
      map(res => res as any[])
    );
  }
}
