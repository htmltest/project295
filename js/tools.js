$(document).ready(function() {

    $('.gallery').each(function() {
        const curGallery = $(this);
        const swiper = new Swiper(curGallery.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
        });
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+\d \d{3} \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\d{2}\.\d{2}\.\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html(curName);
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input').attr('data-placeholder'));
        }
    });

    $('.form-files').each(function() {
        var curFiles = $(this);
        if (curFiles.find('.form-files-list-item').length > 0) {
            curFiles.addClass('full');
            curFiles.find('.files-required').val('true');
        }
    });

    $('body').on('click', '.form-files-list-item-remove', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        $.ajax({
            type: 'GET',
            url: curLink.attr('href'),
            dataType: 'json',
            cache: false
        }).done(function(data) {
            curLink.parent().remove();
            if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
                curFiles.removeClass('full');
                curFiles.find('.files-required').val('');
            }
        });
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-cancel', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        curLink.parent().remove();
        if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
            curFiles.removeClass('full');
            curFiles.find('.files-required').val('');
        }
        e.preventDefault();
    });

    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });

    $(document).bind('dragover', function (e) {
        var dropZones = $('.form-files-dropzone'),
            timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZones.addClass('in');
        }
        var hoveredDropZone = $(e.target).closest(dropZones);
        dropZones.not(hoveredDropZone).removeClass('hover');
        hoveredDropZone.addClass('hover');
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZones.removeClass('in hover');
        }, 100);
    });

    $('body').on('click', '.form-files-dropzone', function(e) {
        var curLink = $(this);
        var curFiles = $(this).parents().filter('.form-files');
        curFiles.find('.form-files-input input').click();
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.side-toggle').click(function(e) {
        $('html').toggleClass('side-minify');
        e.preventDefault();
    });

    $('.main-notify').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.main-header form').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.main-courses').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            navigation: {
                prevEl: curSlider.find('.swiper-button-prev')[0],
                nextEl: curSlider.find('.swiper-button-next')[0]
            },
            scrollbar: {
                el: curSlider.find('.swiper-scrollbar')[0],
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3
                }
            }
        });
    });

    $('.main-webinars').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            spaceBetween: 5,
            freeMode: true,
            mousewheel: true,
            scrollbar: {
                el: curSlider.find('.swiper-scrollbar')[0],
            },
            breakpoints: {
                1200: {
                    direction: 'vertical',
                }
            }
        });
    });

    $('.main-serts').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            navigation: {
                prevEl: curSlider.find('.swiper-button-prev')[0],
                nextEl: curSlider.find('.swiper-button-next')[0]
            },
            scrollbar: {
                el: curSlider.find('.swiper-scrollbar')[0],
            },
            breakpoints: {
                1200: {
                    slidesPerView: 4
                }
            }
        });
    });

    $('.course-card-descr-text').each(function() {
        const curBlock = $(this);
        if (curBlock.find('.course-card-descr-text-container').height() < curBlock.find('.course-card-descr-text-inner').height()) {
            curBlock.addClass('with-more');
        }
    });

    $('.course-card-descr-text-more a').click(function(e) {
        $(this).parents().filter('.course-card-descr-text').toggleClass('open');
        e.preventDefault();
    });

    $('.module-video-link').click(function(e) {
        const curLink = $(this);
        const curBlock = curLink.parent();
        curBlock.addClass('active');
        curBlock.html('<video playsinline autoplay controls><source src="' + curLink.attr('href') + '" type="video/mp4"></video>');
        e.preventDefault();
    });

    $('.marketing-group-header').click(function() {
        const curGroup = $(this).parent();
        curGroup.toggleClass('open');
        curGroup.find('.marketing-group-container').stop(true, true).slideToggle();
    });

    $('.marketing-group-filter').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
            on: {
                init: function() {
                    curSlider.addClass('with-right');
                },
                sliderMove: function(swiper) {
                    if (swiper.progress > 0) {
                        curSlider.addClass('with-left');
                    } else {
                        curSlider.removeClass('with-left');
                    }
                    if (swiper.progress >= 1) {
                        curSlider.removeClass('with-right');
                    } else {
                        curSlider.addClass('with-right');
                    }
                },
                transitionEnd: function(swiper) {
                    if (swiper.progress > 0) {
                        curSlider.addClass('with-left');
                    } else {
                        curSlider.removeClass('with-left');
                    }
                    if (swiper.progress >= 1) {
                        curSlider.removeClass('with-right');
                    } else {
                        curSlider.addClass('with-right');
                    }
                }
            }
        });
    });

    $('.marketing-group-mobile-link').click(function(e) {
        if (!$('html').hasClass('mobile-filter-open')) {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-filter-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
                $('html').data('scrollTop', curScroll);
            }
            $(this).parent().parent().addClass('open');
        } else {
            $('html').removeClass('mobile-filter-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=device-width');
                $(window).scrollTop($('html').data('scrollTop'));
            }
            $('.marketing-group-filter.open').removeClass('open');
        }
        e.preventDefault();
    });

    $('body').on('click', '.marketing-group-videos-item-link', function(e) {
        const curLink = $(this);

        let curPadding = $('.wrapper').width();
        const curScroll = $(window).scrollTop();
        $('html').addClass('window-video-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        let windowHTML =    '<div class="window-video">' +
                                '<div class="window-video-container">';

        windowHTML +=               '<div class="window-video-player"><video playsinline autoplay controls><source src="' + curLink.attr('href') + '" type="video/mp4"></video></div>';
        windowHTML +=               '<div class="window-video-detail">' +
                                        '<div class="window-video-detail-info">' +
                                            '<div class="window-video-detail-title">' + curLink.find('.marketing-group-videos-item-title').html() + '</div>' +
                                            '<div class="window-video-detail-params">' + curLink.find('.marketing-group-videos-item-params').html() + '</div>' +
                                        '</div>' +
                                        '<a href="' + curLink.attr('href') + '" class="window-video-detail-download" download><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-download"></use></svg></a>' +
                                    '</div>';
        windowHTML +=               '<a href="#" class="window-video-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#webinar-cancel"></use></svg></a>';


        windowHTML +=           '</div>' +
                            '</div>';

        $('.window-video').remove();
        $('body').append(windowHTML);

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

        e.preventDefault();
    });

    $('body').on('click', '.window-video-close', function(e) {
        $('.window-video').remove();
        $('html').removeClass('window-video-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-video').length > 0) {
                $('.window-video-close').trigger('click');
            }
        }
    });

    $('.docs-group-header').click(function() {
        const curGroup = $(this).parent();
        curGroup.toggleClass('open');
        curGroup.find('.docs-group-container').stop(true, true).slideToggle();
    });

    $('.docs-group-sub-header').click(function() {
        const curGroup = $(this).parent();
        curGroup.toggleClass('open');
        curGroup.find('.docs-group-sub-container').stop(true, true).slideToggle();
    });

    $('.docs-group-sub-sub-header').click(function() {
        const curGroup = $(this).parent();
        curGroup.toggleClass('open');
        curGroup.find('.docs-group-sub-sub-container').stop(true, true).slideToggle();
    });

    $('.mobile-menu-link').click(function(e) {
        if (!$('html').hasClass('mobile-menu-open')) {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
                $('html').data('scrollTop', curScroll);
            }
        }
        e.preventDefault();
    });

    $('.mobile-menu-close').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=device-width');
                $(window).scrollTop($('html').data('scrollTop'));
            }
        }
        e.preventDefault();
    });

    $('.courses-filter-types').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('body').on('change', '.profile-avatar-new input', function(e) {
        var curBlockAvatar = $(this).parents().filter('.profile-avatar');
        var file = this.files[0];
        if (typeof(file) != 'undefined') {
            var reader = new FileReader;
            reader.onload = function(event) {
                if (file.type.match('image.*')) {
                    curBlockAvatar.find('label.img-error').remove();
                    var exifOrientation = 0;
                    EXIF.getData(file, function () {
                        switch (this.exifdata.Orientation) {
                            case 1:
                                exifOrientation = 0;
                                break;
                            case 2:
                                exifOrientation = 0;
                                break;
                            case 3:
                                exifOrientation = 180;
                                break;
                            case 4:
                                exifOrientation = 180;
                                break;
                            case 5:
                                exifOrientation = 90;
                                break;
                            case 6:
                                exifOrientation = 90;
                                break;
                            case 7:
                                exifOrientation = -90;
                                break;
                            case 8:
                                exifOrientation = -90;
                                break;
                            default:
                                exifOrientation = 0
                        }
                    });
                    var dataUri = event.target.result;
                    var canvas = document.getElementById('photo-editor');
                    var context = canvas.getContext('2d');
                    var img = new Image();
                    img.onload = function() {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.fillStyle = '#FFFFFF';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        var imgWidth  = img.width;
                        var imgHeight = img.height;
                        var newWidth  = 70;
                        var newHeight = 70;
                        var newX = -35;
                        var newY = -35;
                        if (imgWidth > imgHeight) {
                            var diffHeight = newHeight / imgHeight;
                            newWidth = imgWidth * diffHeight;
                            newX = -(newWidth - 70) / 2 - 35;
                        } else {
                            var diffWidth = newWidth / imgWidth;
                            newHeight = imgHeight * diffWidth;
                            newY = -(newHeight - 70) / 2 - 35;
                        }
                        var TO_RADIANS = Math.PI/180;
                        context.save();
                        context.translate(35, 35);
                        context.rotate(exifOrientation * TO_RADIANS);
                        context.drawImage(img, newX, newY, newWidth, newHeight);
                        context.restore();
                        context.translate(0, 0);
                        curBlockAvatar.addClass('active');
                    };
                    img.src = dataUri;
                } else {
                    curBlockAvatar.find('label.img-error').remove();
                    curBlockAvatar.append('<label class="error img-error">' + curBlockAvatar.attr('data-error') + '</label>');
                }
            }
            reader.readAsDataURL(file);
        }
    });

    $('.offline-success-question-answer input').change(function() {
        let isValid = true;
        $('.offline-success-question-answer').each(function() {
            if ($(this).find('input:checked').length == 0) {
                isValid = false;
            }
        });
        if (isValid) {
            $('.offline-success-submit .btn').prop('disabled', false);
        } else {
            $('.offline-success-submit .btn').prop('disabled', true);
        }
    });

    $('.courses-filter-sort-select').each(function() {
        const curSelect = $(this);
        curSelect.find('.courses-filter-sort-select-list input:checked').each(function() {
            const curItem = $(this).parent();
            curItem.addClass('active');
            curSelect.find('.courses-filter-sort-select-current span').html(curItem.find('span').html())
        });
    });

    $('.courses-filter-sort-select-current').click(function() {
        const curSelect = $(this).parents().filter('.courses-filter-sort-select');
        curSelect.toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.courses-filter-sort-select').length == 0) {
            $('.courses-filter-sort-select.open').removeClass('open');
        }
    });

    $('.courses-filter-sort-select-list label span').click(function() {
        const curSelect = $(this).parents().filter('.courses-filter-sort-select');
        curSelect.removeClass('open');
    });

    $('.courses-filter-sort-select-list input').change(function() {
        const curItem = $(this).parent();
        const curSelect = $(this).parents().filter('.courses-filter-sort-select');
        $('.courses-filter-sort-select-list label.active').removeClass('active');
        curItem.addClass('active');
        curSelect.find('.courses-filter-sort-select-current span').html(curItem.find('span').html())
        curSelect.removeClass('open');
    });

});

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+0 000 000-00-00');

    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').mask('00.00.00');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.find('.form-files').each(function() {
        var curFiles = $(this);
        var curInput = curFiles.find('.form-files-input input');

        var uploadURL = curInput.attr('data-uploadurl');
        var uploadFiles = curInput.attr('data-uploadfiles');
        var removeURL = curInput.attr('data-removeurl');
        curInput.fileupload({
            url: uploadURL,
            dataType: 'json',
            dropZone: curFiles.find('.form-files-dropzone'),
            pasteZone: curFiles.find('.form-files-dropzone'),
            add: function(e, data) {
                if (typeof curInput.attr('multiple') !== 'undefined') {
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></span></div>');
                } else {
                    curFiles.find('.form-files-list').html('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></span></div>');
                }
                data.submit();
                curFiles.addClass('full');
            },
            done: function (e, data) {
                curFiles.find('.form-files-list-item-progress').eq(0).remove();
                if (data.result.status == 'success') {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.02745 14H8.97255C10.3264 14 11 13.3143 11 11.9561V6.0271C11 5.1846 10.9085 4.81906 10.3853 4.28358L6.77518 0.620458C6.2785 0.110886 5.87279 0 5.13391 0H2.02745C0.68028 0 0 0.69206 0 2.05055V11.9561C0 13.3208 0.68028 14 2.02745 14ZM2.07963 12.9488C1.40604 12.9488 1.05279 12.5894 1.05279 11.9366V2.07005C1.05279 1.42368 1.40604 1.05118 2.08632 1.05118H4.98993V4.84525C4.98993 5.66798 5.40848 6.0728 6.21934 6.0728H9.94721V11.9366C9.94721 12.5894 9.60038 12.9488 8.92037 12.9488H2.07963ZM6.3371 5.08653C6.08206 5.08653 5.97714 4.98233 5.97714 4.72099V1.25373L9.74408 5.08681L6.3371 5.08653Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.02745 14H8.97255C10.3264 14 11 13.3143 11 11.9561V6.0271C11 5.1846 10.9085 4.81906 10.3853 4.28358L6.77518 0.620458C6.2785 0.110886 5.87279 0 5.13391 0H2.02745C0.68028 0 0 0.69206 0 2.05055V11.9561C0 13.3208 0.68028 14 2.02745 14ZM2.07963 12.9488C1.40604 12.9488 1.05279 12.5894 1.05279 11.9366V2.07005C1.05279 1.42368 1.40604 1.05118 2.08632 1.05118H4.98993V4.84525C4.98993 5.66798 5.40848 6.0728 6.21934 6.0728H9.94721V11.9366C9.94721 12.5894 9.60038 12.9488 8.92037 12.9488H2.07963ZM6.3371 5.08653C6.08206 5.08653 5.97714 4.98233 5.97714 4.72099V1.25373L9.74408 5.08681L6.3371 5.08653Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a></div>');
                    }
                    curFiles.find('.files-required').val('true');
                    curFiles.find('label.error').remove();
                } else {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.02745 14H8.97255C10.3264 14 11 13.3143 11 11.9561V6.0271C11 5.1846 10.9085 4.81906 10.3853 4.28358L6.77518 0.620458C6.2785 0.110886 5.87279 0 5.13391 0H2.02745C0.68028 0 0 0.69206 0 2.05055V11.9561C0 13.3208 0.68028 14 2.02745 14ZM2.07963 12.9488C1.40604 12.9488 1.05279 12.5894 1.05279 11.9366V2.07005C1.05279 1.42368 1.40604 1.05118 2.08632 1.05118H4.98993V4.84525C4.98993 5.66798 5.40848 6.0728 6.21934 6.0728H9.94721V11.9366C9.94721 12.5894 9.60038 12.9488 8.92037 12.9488H2.07963ZM6.3371 5.08653C6.08206 5.08653 5.97714 4.98233 5.97714 4.72099V1.25373L9.74408 5.08681L6.3371 5.08653Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.02745 14H8.97255C10.3264 14 11 13.3143 11 11.9561V6.0271C11 5.1846 10.9085 4.81906 10.3853 4.28358L6.77518 0.620458C6.2785 0.110886 5.87279 0 5.13391 0H2.02745C0.68028 0 0 0.69206 0 2.05055V11.9561C0 13.3208 0.68028 14 2.02745 14ZM2.07963 12.9488C1.40604 12.9488 1.05279 12.5894 1.05279 11.9366V2.07005C1.05279 1.42368 1.40604 1.05118 2.08632 1.05118H4.98993V4.84525C4.98993 5.66798 5.40848 6.0728 6.21934 6.0728H9.94721V11.9366C9.94721 12.5894 9.60038 12.9488 8.92037 12.9488H2.07963ZM6.3371 5.08653C6.08206 5.08653 5.97714 4.98233 5.97714 4.72099V1.25373L9.74408 5.08681L6.3371 5.08653Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5" stroke-linecap="round" stroke-linejoin="round" /></svg></a></div>');
                    }
                }
                curFiles.addClass('full');
            }
        });
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 10
        };
        if (typeof(curSelect.attr('data-searchplaceholder')) != 'undefined') {
            options['searchInputPlaceholder'] = curSelect.attr('data-searchplaceholder');
        }
        if (curForm.hasClass('clinics-ctrl')) {
            options['allowClear'] = true;
        }
        curSelect.select2(options);
        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            $(e.delegateTarget).parent().find('.select2-search--inline input').val('').trigger('input.search').trigger('focus');
            $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });
        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                $(e.delegateTarget).parent().find('.select2-container').removeClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-placeholder'));
            } else {
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            }
        });
        if (typeof(curSelect.attr('multiple')) != 'undefined') {
            curSelect.on('select2:open', function(e) {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            });
        }
        if (curSelect.find('option:selected').length > 0 && curSelect.find('option:selected').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.on('reset', function() {
        curForm.find('.form-files-list-item-remove').trigger('click');
        curForm.find('.form-select select').val(null).trigger('change');
    });

    curForm.validate({
        ignore: '',
    });
}

$(window).on('load resize', function() {

    $('.course-card-contents-menu').each(function() {
        $('.course-card-contents-menu').removeClass('middle mini');
        let isValid = true;

        $('.course-card-contents-menu-item').each(function() {
            const curItem = $(this);
            if (curItem.width() < curItem.find('.course-card-contents-menu-item-inner').width()) {
                isValid = false;
            }
        });

        if (!isValid) {
            $('.course-card-contents-menu').addClass('middle');
            isValid = true;

            $('.course-card-contents-menu-item').each(function() {
                const curItem = $(this);
                if (curItem.width() < curItem.find('.course-card-contents-menu-item-inner').width()) {
                    isValid = false;
                }
            });

            if (!isValid) {
                $('.course-card-contents-menu').addClass('mini');
            }
        }
    });

});