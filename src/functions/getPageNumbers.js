import range from './range';

export const LEFT_PAGE = 'Prev';
export const RIGHT_PAGE = 'Next';

function getPageNumbers(totalPages, selected, adjacent = 1) {
  const totalNumbers = adjacent * 2 + 3;
  const totalButtons = totalNumbers + 2;

  if (totalPages > totalButtons) {
    const startPage = Math.max(2, selected - adjacent);
    const endPage = Math.min(totalPages - 1, selected + adjacent);
    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    let extraPages;
    switch (true) {
      case hasLeftSpill && !hasRightSpill:
        extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;

      case !hasLeftSpill && hasRightSpill:
        extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;

      case hasLeftSpill && hasRightSpill:
      default:
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
}

export default getPageNumbers;
