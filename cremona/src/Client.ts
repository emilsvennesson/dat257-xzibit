import { RequestManager, Client, HTTPTransport } from '@open-rpc/client-js';
import { Book } from './Book.js';

const baseWebSocket = 'https://admin.abicart.se/backend/jsonrpc/v1';
const baseSocketParams = {
  auth: '',
  language: 'sv',
  session: '',
  webshop: '22777',
};
const baseSearchParams = {
  name: { sv: true },
  articleNumber: true,
  uid: true,
  url: true,
  price: true,
  introductionText: { sv: true },
  images: true,
  description: { sv: true },
  weight: true,
  showPricesIncludingVat: true,
  attributes: true,
  ean: true,
  articlegroup: true,
};
const bookCategories = [3331049, 3331050, 3331051];
const transport = new HTTPTransport(
  `${baseWebSocket}?${new URLSearchParams(baseSocketParams).toString()}`,
);
const requestManager = new RequestManager([transport]);
const rclient = new Client(requestManager);

const getSearchArticles = async (query: string) => {
  const result = await rclient.request({
    method: 'Article.search',
    params: [query],
  });
  return result;
};

const resultToBooksArray = (result: []) => {
  const books: Book[] = [];
  result.forEach((book) => books.push(new Book(book)));
  return books;
};

export class CremonaClient {
  /**
   * Returns a promise of a list of Book objects matching the specified search query.
   * @param {string} query - The search query to filter out books based on.
   * @param {number} [limit] - Limits the amount of returned books to the specified number.
   * @param {number} [offset] - The start offset to get the books from.
   * @returns {Promise<Book[]>} Promise object representing the Book objects list.
   */
  async search(
    query: string,
    limit: number = 48,
    offset: number = 0,
  ): Promise<Book[]> {
    const searchArticles = await getSearchArticles(query);
    if (!searchArticles) return [];
    const payload = {
      method: 'Article.list',
      params: [
        baseSearchParams,
        {
          filters: {
            '/uid': { in: searchArticles },
          },
        },
      ],
    };

    const result = await rclient.request(payload);
    return resultToBooksArray(
      result.filter((bookData: { articlegroup: number }) =>
        bookCategories.includes(bookData.articlegroup),
      ),
    ).slice(offset, limit + offset);
  }

  /**
   * Returns a promise of a single Book object wrapped in a list.
   * @param {number} uid - The unique identifier (UID) to get a book for.
   * @returns {Promise<Book[]>} Promise object representing the single Book object wrapped in a list.
   */
  async getBook(uid: number) {
    const payload = {
      method: 'Article.get',
      params: [uid, true],
    };
    const result = await rclient.request(payload);
    return [new Book(result)];
  }

  /**
   * Returns a promise of a list of Book objects from all of Chalmers Store's available books.
   * @param {number} [limit] - Limits the amount of returned books to the specified number.
   * @param {number} [offset] - The start offset to get the books from.
   * @returns {Promise<Book[]>} Promise object representing the Book objects list.
   */
  async getBooks(limit: number = 48, offset: number = 0) {
    const payload = {
      method: 'Article.list',
      params: [
        baseSearchParams,
        {
          filters: {
            '/showInArticlegroups': bookCategories,
          },
          limit: limit,
          offset: offset,
        },
      ],
    };

    const result = await rclient.request(payload);
    return resultToBooksArray(result);
  }
}
