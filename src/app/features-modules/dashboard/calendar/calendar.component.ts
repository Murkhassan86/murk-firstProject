import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { CalendarService } from '../calendar.service';
import * as moment from 'moment'; // use for parsing, manipulating, displaying date and time in javascript
import { FormGroup, FormControl } from '@angular/forms';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
@ViewChild('modalContent', {static: false}) modalContent: TemplateRef<any>;
view: CalendarView = CalendarView.Month;
CalendarView = CalendarView;
userInfoList: any[];
userBirthDateList: any[];
allEvents = { completed: [], pending: [] };
detailView: boolean;
birthDate: any;
usersData: any;
activeModal: NgbActiveModal;
viewDate: Date = new Date();
eventForm: FormGroup;
eventList: any[];
selectedEventId: any;
eventList2: any[];
timeOut: any;
modalConfig: any = { size: 'sm', ariaLabelledBy: 'modal-basic-title' };
modalData: {
  action: string;
  event: CalendarEvent;
};


actions: CalendarEventAction[] = [
  {
    label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    a11yLabel: 'Edit',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edited', event);
    },
  },
  {
    label: '<i class="fas fa-fw fa-trash-alt"></i>',
    a11yLabel: 'Delete',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.handleEvent('Deleted', event);
    },
  },
  {
    label: '<i class="fa fa-th"></i>',
    a11yLabel: 'View',
    onClick: ({ event } : { event: CalendarEvent}) : void => {
      this.handleEvent('Edited', event);
      this.selectedEventId = event.id;
    }
  }
];
refresh: Subject<any> = new Subject();
events: CalendarEvent[] = [
  // {
  //   start: subDays(startOfDay(new Date()), 4),
  //   end: addDays(new Date(), 0),
  //   title: 'My Periods date',
  //   color: colors.red,
  //   actions: this.actions,
  //   allDay: true,
  //   resizable: {
  //     beforeStart: true,
  //     afterEnd: true,
  //   },
  //   draggable: true,
  // },
  // {
  //   start: startOfDay(new Date()),
  //   title: 'An event with no end date',
  //   color: colors.yellow,
  //   actions: this.actions,
  // },
  // {
  //   start: subDays(endOfMonth(new Date()), 3),
  //   end: addDays(endOfMonth(new Date()), 0),
  //   title: 'A long event that spans 2 months',
  //   color: colors.blue,
  //   allDay: true,
  // },
  // {
  //   start: addHours(startOfDay(new Date()), 2),
  //   end: addHours(new Date(), 2),
  //   title: 'A draggable and resizable event',
  //   color: colors.yellow,
  //   actions: this.actions,
  //   resizable: {
  //     beforeStart: true,
  //     afterEnd: true,
  //   },
  //   draggable: true,
  // },
];

activeDayIsOpen: boolean = true;
  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private calendarService: CalendarService
  ) { 

    this.eventForm = new FormGroup({
      title: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl('')
    })

  }

getUserInfo() {
  this.dashboardService.getUserInfo()
  .pipe(
    take(1),
    tap((resp: any) => {
      if (!!resp.success) {
        this.userInfoList = resp.result;
        this.userBirthDateList = resp.result.map((userObj) => {
         this.events.push ({
            ...userObj,
            start: new Date(<any>moment(userObj['birthDate'])),
            title: `${userObj['firstName']} - Birth Date`,
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true, 
          });
        });
        this.cd.markForCheck();
        console.log('~~ this.userBirthDateList success', resp);
        this.filterEvents();
      }

    })
  ).subscribe();
}

filterEvents() {
  this.allEvents.completed = this.events.filter(x => x['status'] == "COMPLETED");
  this.allEvents.pending = this.events.filter(x => x['status'] == "Pending");
}


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.detailView = true;
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  open( content?: any) {
    this.activeModal = this.modalService.open(content, this.modalConfig);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {
    this.getUserInfo();
    this.getEventInfo();
  }

  createEvent(eventInfo) {
    console.log(eventInfo);
    this.calendarService.createEvent(eventInfo)
    .pipe(
      take(1),
      tap((resp: any) => {
        if (resp.success) {
          this.eventList.push(resp.result);
          this.timeOut = setTimeout(() => { this.activeModal.close(); }, 1000);
          console.log('~~Event created successfully', resp);
         
        }
        this.cd.markForCheck();
      })
    ).subscribe();
  }

  getEventInfo() {
    this.calendarService.getEvent()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.eventList = resp.result;
        this.eventList2 = resp.result.map((eventObj) => {
          this.events.push ({
             ...eventObj,
             start: new Date(<any>moment(eventObj['date'])),
             title: `${eventObj['title']}`,
             id: `${eventObj['_id']}`,
             color: colors.red,
             actions: this.actions,
             allDay: true,
             resizable: {
               beforeStart: true,
               afterEnd: true,
             },
             draggable: true, 
           });
         });
         this.cd.markForCheck();
         console.log('~~calendar events created successfully', resp);
         this.filterEvents();
      })
    ).subscribe();
  }
  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
}
