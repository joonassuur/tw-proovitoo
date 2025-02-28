import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from '../table.service';
import { Person } from '../types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  peopleAll: Person[] = [];
  people: Person[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 108;
  totalPages = 1;
  expandedRowId: string = '';
  sortColumn: string = '';
  sortDirection: '' | 'asc' | 'desc' = '';

  constructor(
    private tableService: TableService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.tableService.getPeople(this.totalItems).subscribe((response) => {
      this.peopleAll = response.list;
      this.totalPages = Math.ceil(this.peopleAll.length / this.pageSize);
      this.updatePagedData();
    });
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    let sortedData = [...this.peopleAll];

    if (this.sortColumn) {
      sortedData.sort((a, b) => {
        let valueA = this.getSortValue(a, this.sortColumn);
        let valueB = this.getSortValue(b, this.sortColumn);

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.people = sortedData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  toggleRow(personId: string): void {
    this.expandedRowId = this.expandedRowId === personId ? '' : personId;
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getDisplayedPages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(total, current + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(total, startPage + 4);
      } else if (endPage === total) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      if (this.sortDirection === '') {
        this.sortDirection = 'asc';
      } else if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        this.sortDirection = '';
        this.sortColumn = '';
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.updatePagedData();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') return '&#9650;';
      if (this.sortDirection === 'desc') return '&#9660;';
    }
    return '&#9650;&#9660;';
  }

  getSortValue(person: Person, column: string): any {
    switch (column) {
      case 'firstname':
      case 'surname':
      case 'sex':
        return person[column]?.toLowerCase();
      case 'date':
        return person.date;
      default:
        return '';
    }
  }
}
