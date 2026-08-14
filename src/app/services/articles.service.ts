import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


  private firestore = inject(Firestore);
  constructor() { }

  /** Fetch article links from Firestore: myArticle/article → links[] */
  async getMyArticleLinks() {
    try {
      const docRef = doc(this.firestore, 'myArticle', 'article');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data['links'] as string[];
      } else {
        console.warn('Firestore document myArticle/article not found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching myArticle from Firestore:', error);
      return [];
    }
  }
}
