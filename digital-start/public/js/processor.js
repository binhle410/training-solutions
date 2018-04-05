(function ($) {
// <input value="0" type="radio" name="home" class="ipt-checkbox template-selection" data-page="0" data-option="0" data-home="-1">
//         </div>
//         <a data-lightbox="home1" href="uploads/prods/home0.jpg">
//         <!-- END : TTL-->
//     <div class="design-img"><img src="uploads/prods/home0.jpg" alt=""></div>
//         <!-- END : IMG--></a>
    window.templateSelections = [
        [
            'home selection 1',
            ['A propos 1', 'A propos 2', 'A propos 3'],
            ['prestation 1', 'prestation 2', 'prestation 3'],
            ['galerie 1', 'galerie 2', 'galerie 3'],
            ['blog 1', 'blog 2', 'blog 3'],
            ['contact 1', 'contact 2', 'contact 3'],
        ],
        [
            'home selection 2',
            ['A propos 4', 'A propos 5', 'A propos 6'],
            ['prestation 4', 'prestation 5', 'prestation 6'],
            ['galerie 4', 'galerie 5', 'galerie 6'],
            ['blog 4', 'blog 5', 'blog 6'],
            ['contact 4', 'contact 5', 'contact 6'],
        ],
        [
            'home selection 3',
            ['A propos 7', 'A propos 8', 'A propos 9'],
            ['prestation 7', 'prestation 8', 'prestation 9'],
            ['galerie 7', 'galerie 8', 'galerie 9'],
            ['blog 7', 'blog 8', 'blog 9'],
            ['contact 7', 'contact 8', 'contact 9'],
        ]
    ];

    /**
     * START - ONLOAD - JS
     */
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function ($) {
        $form = $('form');
        $templateSelections = $('.template-selection');
        $btnValidateStep = $('.btn.validate-step');
        $btnPreviousStep = $('.btn.previous-step');

        $('.scroll-down').on('click', function () {
            $('html, body').animate({
                scrollTop: $("section.main").offset().top
            }, 1000);
        })

        $.getScript('js/jquery.form.min.js', function (data, textStatus, jqxhr) {
            initForm()
        });

        $.getScript('js/jquery.validate.min.js', function (data, textStatus, jqxhr) {
            $.getScript('js/validate-i18n/messages_fr.js', function (data, textStatus, jqxhr) {
                initValidation()
            });
        });
        $.getScript('lightbox/js/lightbox.min.js', function (data, textStatus, jqxhr) {
            initLightbox()
        });
        $.getScript('js/sprintf.min.js', function (data, textStatus, jqxhr) {
            initTemplateSelections();
        });


    });

    var initTemplateSelections = function () {
        $('.design-wrap .progress').on('click', function () {
            var nextStep = $(this).data('page');
            var $nextStep = $(sprintf('[role="tabpanel"][data-page="%d"]', nextStep));
            var $currentStep = $('.design-content [role="tabpanel"]:visible');

            if ($(this).hasClass('active')) {
                // ideally $nextStep.find('.template-selection:checked').length > 0
                $currentStep.fadeOut(500, function () {
                    $nextStep.fadeIn();
                });
            }
        })

        $templateSelections.on('change', function () {
            var page = $(this).parents('[role="tabpanel"]').data('page');
            var option = $(this).data('option');
            var home = $(this).parents('.design-list').data('home');
            $btnValidateProfileStep = $('#blk-design').find('.btn.validate-step');

            if (this.checked) {
                $tabPanel = $(this).parents('[role="tabpanel"]');
                // var currentStep = parseInt($(this).parents('[data-page]'));
                var currentStep = parseInt(page);//parseInt($(this).data('page'));
                if (currentStep === 0) {
                    $btnValidateProfileStep.attr('disabled', 'disabled');
                    $tabPanel.siblings().find('input:checked').prop('checked', false);
                    $tabPanel.siblings().children('.design-list').hide();

                    $('.progress[data-page="0"]').siblings().removeClass('active');
                }

                if (!$tabPanel.hasClass('final')) {
                    $tabPanel.fadeOut(500, function () {
                        var nextStep = currentStep + 1;

                        $nextStep = $(sprintf('[role="tabpanel"][data-page="%d"]', nextStep));

                        $nextStep.fadeIn();

                        var nextDesignListHome = -1;
                        if (home > -1) {
                            nextDesignListHome = home;
                        } else {
                            nextDesignListHome = option;
                        }

                        $designList = $(sprintf('.design-list[data-home="%d"]', nextDesignListHome));
                        $designList.fadeIn();

                        $nextProgress = $(sprintf('.progress[data-page="%d"]', nextStep));
                        $nextProgress.addClass('active');
                    });
                } else {
                    if ($btnValidateProfileStep.attr('disabled')) {
                        $btnValidateProfileStep.removeAttr('disabled');
                    }
                    $btnValidateProfileStep.prop("disabled", false);
                }
            }

        })
    }

    var initLightbox = function () {

    }
    var validateFieldRequired = function () {
        var isValid = true;
        $(':input[required]:visible').each(function (index) {
            if ($(this).val() == '') {
                $(this).parents('.block').find('.title').after(sprintf('<label id="%1$s-error" class="error" for="%1$s">%2$s</label>', $(this).attr('name'), 'Ce champ est obligatoire.'));
                isValid = false;
            }
        })
        return isValid;
    }

    var validateFieldRadio = function (field, title, block) {
        var fieldChoiceHtml = sprintf('[name="%s[choice]"]', field);
        var fieldAutreHtml = sprintf('[name="%s[autres]"]', field);
        var $selected = $(sprintf('%s:checked', fieldChoiceHtml));
        if ($selected.length === 0) {
            $radioTextInput = $('[type="text"]' + fieldChoiceHtml);
            if ($radioTextInput.length === 0) {
                $radioTextInput = $('[type="text"]' + fieldAutreHtml);
                var fieldHtml = fieldAutreHtml
            } else {
                var fieldHtml = fieldChoiceHtml

            }
            if ($radioTextInput.length > 0) {
                if ($radioTextInput.val() !== '') {
                    return true;
                }
            }

            $(fieldHtml).parents(block).find(title).after(sprintf('<label id="%1$s-error" class="error" for="%1$s">%2$s</label>', field, 'Ce champ est obligatoire.'));
            // console.log($(fieldHtml))
            return false;
        }
        return true;
    }
    var validateForm = function () {
        $('.error').remove();
        var isValid = true;
        isValid &= validateFieldRadio('data[step-1][activite]', '.profil-ttl', '.blk-profil')
        isValid &= validateFieldRadio('data[step-1][nature]', '.profil-ttl', '.blk-profil')
        // isValid &= validateFieldRadio('data[step-1][vos-clients][sex]', '.profil-ttl', '.blk-profil')
        // isValid &= validateFieldRadio('data[step-1][vos-clients][age]', '.profil-ttl', '.blk-profil')
        isValid &= validateFieldRequired();

        if (!(isValid)) {
            return false;
        }
        return true;
    }

    var initValidation = function () {
        $btnValidateStep.on('click', function () {
            if (validateForm()) {
                $blkContent = $(this).parents('.blk-content');
                var currentStep = parseInt($blkContent.data('step'));
                var nextStep = currentStep + 1;
                var maxStep = $('.blk-content.final').data('step');
                console.log('max s ' + maxStep)
                if (nextStep <= maxStep) {
                    $blkContent.fadeOut(500, function () {
                        $nextBlk = $(sprintf('.blk-content[data-step="%d"]', nextStep));
                        $(sprintf('.pagi-wrap [data-step="%d"]', nextStep)).addClass('active');
                        $nextBlk.fadeIn();
                    })
                }
            }

        });

        $btnPreviousStep.on('click', function () {
            $blkContent = $(this).parents('.blk-content');
            var currentStep = parseInt($blkContent.data('step'));
            var previousStep = currentStep - 1;
            if (currentStep > 1) {
                $blkContent.fadeOut(500, function () {
                    $(sprintf('.blk-content[data-step="%d"]', previousStep)).fadeIn();
                })
            }


        });
    }

    var initForm = function () {
        $btnSubmit = $('#btn-submit');

        var options = {
            beforeSubmit: function () {
                $btnSubmit.attr('disabled', 'disabled');
                $btnSubmit.prop('disabled', true);
                $btnSubmit.text('Remise en cours');
                $btnSubmit.addClass('processing');
            },  // pre-submit callback
            success: function () {
                $('.alert').fadeIn(1000, function () {
                    $btnSubmit.removeAttr('disabled');
                    $btnSubmit.prop('disabled', false);
                    $btnSubmit.text("Let's go");
                    $btnSubmit.removeClass('processing');
                });

            }  // post-submit callback

            // other available options:
            //url:       url         // override for form's 'action' attribute
            //type:      type        // 'get' or 'post', override for form's 'method' attribute
            //dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
            //clearForm: true        // clear all form fields after successful submit
            //resetForm: true        // reset the form after successful submit

            // $.ajax options can be used here too, for example:
            //timeout:   3000
        };

        // bind form using 'ajaxForm'
        $form.ajaxForm(options);

    }
    /* OnLoad Window */
    var init = function () {

    };
    window.onload = init;
})(jQuery);