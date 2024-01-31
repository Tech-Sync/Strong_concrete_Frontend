
import {
  HorizontalDashboardIcon,
  HorizontalDropRotateIcon,
  HorizontalComponentIcon,
  HorizontalElementsIcon,
  HorizontalTablesıcon,
  HorizontalFormsIcon,
  HorizontalPagesIcon,
  HorizontalMoreIcon,
  HorizontalAppsIcon,
  HorizontalDropIcon
} from '@/app/icons';
import t from '@/utils/getLanguage';
import Link from 'next/link';

const HorizontalBar = () => {
  return (
    <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white py-1.5 px-6 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalDashboardIcon />
            <span className="px-1">{t('dashboard')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/">{t('sales')}</Link>
          </li>
          <li>
            <Link href="/analytics">{t('analytics')}</Link>
          </li>
          <li>
            <Link href="/finance">{t('finance')}</Link>
          </li>
          <li>
            <Link href="/crypto">{t('crypto')}</Link>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalAppsIcon />
            <span className="px-1">{t('apps')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/apps/chat">{t('chat')}</Link>
          </li>
          <li>
            <Link href="/apps/mailbox">{t('mailbox')}</Link>
          </li>
          <li>
            <Link href="/apps/todolist">{t('todo_list')}</Link>
          </li>
          <li>
            <Link href="/apps/notes">{t('notes')}</Link>
          </li>
          <li>
            <Link href="/apps/scrumboard">{t('scrumboard')}</Link>
          </li>
          <li>
            <Link href="/apps/contacts">{t('contacts')}</Link>
          </li>
          <li className="relative">
            <button type="button">
              {t('invoice')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/apps/invoice/list">{t('list')}</Link>
              </li>
              <li>
                <Link href="/apps/invoice/preview">{t('preview')}</Link>
              </li>
              <li>
                <Link href="/apps/invoice/add">{t('add')}</Link>
              </li>
              <li>
                <Link href="/apps/invoice/edit">{t('edit')}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/apps/calendar">{t('calendar')}</Link>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalComponentIcon />
            <span className="px-1">{t('components')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/components/tabs">{t('tabs')}</Link>
          </li>
          <li>
            <Link href="/components/accordions">{t('accordions')}</Link>
          </li>
          <li>
            <Link href="/components/modals">{t('modals')}</Link>
          </li>
          <li>
            <Link href="/components/cards">{t('cards')}</Link>
          </li>
          <li>
            <Link href="/components/carousel">{t('carousel')}</Link>
          </li>
          <li>
            <Link href="/components/countdown">{t('countdown')}</Link>
          </li>
          <li>
            <Link href="/components/counter">{t('counter')}</Link>
          </li>
          <li>
            <Link href="/components/sweetalert">{t('sweet_alerts')}</Link>
          </li>
          <li>
            <Link href="/components/timeline">{t('timeline')}</Link>
          </li>
          <li>
            <Link href="/components/notifications">{t('notifications')}</Link>
          </li>
          <li>
            <Link href="/components/media-object">{t('media_object')}</Link>
          </li>
          <li>
            <Link href="/components/list-group">{t('list_group')}</Link>
          </li>
          <li>
            <Link href="/components/pricing-table">{t('pricing_tables')}</Link>
          </li>
          <li>
            <Link href="/components/lightbox">{t('lightbox')}</Link>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalElementsIcon />
            <span className="px-1">{t('elements')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/elements/alerts">{t('alerts')}</Link>
          </li>
          <li>
            <Link href="/elements/avatar">{t('avatar')}</Link>
          </li>
          <li>
            <Link href="/elements/badges">{t('badges')}</Link>
          </li>
          <li>
            <Link href="/elements/breadcrumbs">{t('breadcrumbs')}</Link>
          </li>
          <li>
            <Link href="/elements/buttons">{t('buttons')}</Link>
          </li>
          <li>
            <Link href="/elements/buttons-group">{t('button_groups')}</Link>
          </li>
          <li>
            <Link href="/elements/color-library">{t('color_library')}</Link>
          </li>
          <li>
            <Link href="/elements/dropdown">{t('dropdown')}</Link>
          </li>
          <li>
            <Link href="/elements/infobox">{t('infobox')}</Link>
          </li>
          <li>
            <Link href="/elements/jumbotron">{t('jumbotron')}</Link>
          </li>
          <li>
            <Link href="/elements/loader">{t('loader')}</Link>
          </li>
          <li>
            <Link href="/elements/pagination">{t('pagination')}</Link>
          </li>
          <li>
            <Link href="/elements/popovers">{t('popovers')}</Link>
          </li>
          <li>
            <Link href="/elements/progress-bar">{t('progress_bar')}</Link>
          </li>
          <li>
            <Link href="/elements/search">{t('search')}</Link>
          </li>
          <li>
            <Link href="/elements/tooltips">{t('tooltips')}</Link>
          </li>
          <li>
            <Link href="/elements/treeview">{t('treeview')}</Link>
          </li>
          <li>
            <Link href="/elements/typography">{t('typography')}</Link>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalTablesıcon />
            <span className="px-1">{t('tables')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/tables">{t('tables')}</Link>
          </li>
          <li className="relative">
            <button type="button">
              {t('datatables')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/datatables/basic">{t('basic')}</Link>
              </li>
              <li>
                <Link href="/datatables/advanced">{t('advanced')}</Link>
              </li>
              <li>
                <Link href="/datatables/skin">{t('skin')}</Link>
              </li>
              <li>
                <Link href="/datatables/order-sorting">{t('order_sorting')}</Link>
              </li>
              <li>
                <Link href="/datatables/multi-column">{t('multi_column')}</Link>
              </li>
              <li>
                <Link href="/datatables/multiple-tables">{t('multiple_tables')}</Link>
              </li>
              <li>
                <Link href="/datatables/alt-pagination">{t('alt_pagination')}</Link>
              </li>
              <li>
                <Link href="/datatables/checkbox">{t('checkbox')}</Link>
              </li>
              <li>
                <Link href="/datatables/range-search">{t('range_search')}</Link>
              </li>
              <li>
                <Link href="/datatables/export">{t('export')}</Link>
              </li>
              <li>
                <Link href="/datatables/column-chooser">{t('column_chooser')}</Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalFormsIcon />
            <span className="px-1">{t('forms')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/forms/basic">{t('basic')}</Link>
          </li>
          <li>
            <Link href="/forms/input-group">{t('input_group')}</Link>
          </li>
          <li>
            <Link href="/forms/layouts">{t('layouts')}</Link>
          </li>
          <li>
            <Link href="/forms/validation">{t('validation')}</Link>
          </li>
          <li>
            <Link href="/forms/input-mask">{t('input_mask')}</Link>
          </li>
          <li>
            <Link href="/forms/select2">{t('select2')}</Link>
          </li>
          <li>
            <Link href="/forms/touchspin">{t('touchspin')}</Link>
          </li>
          <li>
            <Link href="/forms/checkbox-radio">{t('checkbox_&_radio')}</Link>
          </li>
          <li>
            <Link href="/forms/switches">{t('switches')}</Link>
          </li>
          <li>
            <Link href="/forms/wizards">{t('wizards')}</Link>
          </li>
          <li>
            <Link href="/forms/file-upload">{t('file_upload')}</Link>
          </li>
          <li>
            <Link href="/forms/quill-editor">{t('quill_editor')}</Link>
          </li>
          <li>
            <Link href="/forms/markdown-editor">{t('markdown_editor')}</Link>
          </li>
          <li>
            <Link href="/forms/date-picker">{t('date_&_range_picker')}</Link>
          </li>
          <li>
            <Link href="/forms/clipboard">{t('clipboard')}</Link>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalPagesIcon />
            <span className="px-1">{t('pages')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li className="relative">
            <button type="button">
              {t('users')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/users/profile">{t('profile')}</Link>
              </li>
              <li>
                <Link href="/users/user-account-settings">{t('account_settings')}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/pages/knowledge-base">{t('knowledge_base')}</Link>
          </li>
          <li>
            <Link href="/pages/contact-us" target="_blank">
              {t('contact_form')}
            </Link>
          </li>
          <li>
            <Link href="/pages/faq">{t('faq')}</Link>
          </li>
          <li>
            <Link href="/pages/coming-soon" target="_blank">
              {t('coming_soon')}
            </Link>
          </li>
          <li>
            <Link href="/pages/maintenence" target="_blank">
              {t('maintenence')}
            </Link>
          </li>
          <li className="relative">
            <button type="button">
              {t('error')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/pages/error404" target="_blank">
                  {t('404')}
                </Link>
              </li>
              <li>
                <Link href="/pages/error500" target="_blank">
                  {t('500')}
                </Link>
              </li>
              <li>
                <Link href="/pages/error503" target="_blank">
                  {t('503')}
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <button type="button">
              {t('login')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/auth/cover-login" target="_blank">
                  {t('login_cover')}
                </Link>
              </li>
              <li>
                <Link href="/auth/boxed-signin" target="_blank">
                  {t('login_boxed')}
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <button type="button">
              {t('register')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/auth/cover-register" target="_blank">
                  {t('register_cover')}
                </Link>
              </li>
              <li>
                <Link href="/auth/boxed-signup" target="_blank">
                  {t('register_boxed')}
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <button type="button">
              {t('password_recovery')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/auth/cover-password-reset" target="_blank">
                  {t('recover_id_cover')}
                </Link>
              </li>
              <li>
                <Link href="/auth/boxed-password-reset" target="_blank">
                  {t('recover_id_boxed')}
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <button type="button">
              {t('lockscreen')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-180">
                <HorizontalDropIcon />
              </div>
            </button>
            <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
              <li>
                <Link href="/auth/cover-lockscreen" target="_blank">
                  {t('unlock_cover')}
                </Link>
              </li>
              <li>
                <Link href="/auth/boxed-lockscreen" target="_blank">
                  {t('unlock_boxed')}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <HorizontalMoreIcon />
            <span className="px-1">{t('more')}</span>
          </div>
          <div className="right_arrow">
            <HorizontalDropRotateIcon />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <Link href="/dragndrop">{t('drag_and_drop')}</Link>
          </li>
          <li>
            <Link href="/charts">{t('charts')}</Link>
          </li>
          <li>
            <Link href="/font-icons">{t('font_icons')}</Link>
          </li>
          <li>
            <Link href="/widgets">{t('widgets')}</Link>
          </li>
          <li>
            <button type="button">{t('documentation')}</button>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default HorizontalBar