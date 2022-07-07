import TableHeader from '$lib/TableHeader.svelte';

import { writable } from 'svelte/store';

export const toggleModal = writable(null);

export const isSearching = writable('');
export const SearchTerm = writable('');
export const fields = writable('');
export const selection = writable(1);
export const fieldID = writable('');
export const pages = writable(1);
export const category = writable(1);
export const colModal = writable(false);
export const boundary = writable(null);

export const caseStudyCols = writable([
  {
    label: 'Title',
    id: 'title',
    show: true,
    title: 'Title',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'client',
    label: 'Client',
    show: true,
    title: 'Client',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'clientIndustry',
    label: 'Client Industry',
    show: true,
    title: 'Client Industry',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'lob',
    label: 'Client LOB',
    show: true,
    title: 'Client LOB',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'targetLocation',
    label: 'Target Location',
    show: true,
    title: 'Target Location',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'pdf',
    label: 'PDF',
    show: true,
    title: 'PDF',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'webpage',
    label: 'Webpage',
    show: true,
    title: 'Webpage',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'targetDM',
    label: 'Target DM',
    show: false,
    title: 'Target DM',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'targetIndustry',
    label: 'Target Industry',
    show: false,
    title: 'Target Industry',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'clientLocation',
    label: 'Client Location',
    show: false,
    title: 'Client Location',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'hq',
    label: 'Client HQ',
    show: false,
    title: 'Client HQ',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'campaign',
    label: 'Campaign',
    show: false,
    title: 'Campaign',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
  {
    id: 'results',
    label: 'Results',
    show: false,
    title: 'Results',
    headerComponent: TableHeader,
    cellAs: 'td',
  },
]);
