// La asignatura de DSI acaba de lanzar su feed de noticias y necesita implementar un sistema de gestión de suscriptores al mismo. 
// Implemente las entidades software necesarias, respetando el patrón de diseño Observer, que permitan llevar a cabo dicha gestión. 
// En concreto, cada vez que en el canal se publique algún tipo de noticia, todos los suscriptores deberán ser notificados.

/**
 * Interface for observable classes
 */
export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(news: string): void;
}

/**
 * Interface for observer classes
 */
export interface Observer {
  update(news: string): void;
}

/**
 * Class NewsFeed that implements the Observable interface
 * NewsFeed objects can be observed
 */
export class NewsFeed implements Observable {
  private observers: Observer[] = [];

  constructor(private id: number, private name: string) {
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }

  subscribe(observer: Observer) {
    if (this.observers.includes(observer)) {
      throw new Error('El observador ya se ha suscrito');
    } else {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      throw new Error('El observador no se ha suscrito');
    } else {
      this.observers.splice(index, 1);
    }
  }

  notify(news: string) {
    this.observers.forEach(observer => observer.update(news));
  }
}


