import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import $ from 'jquery';
import './style.css';

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: ['apple', 'watermelon']
    };
  }

  componentDidMount() {
    try {
      var elmnt = document.getElementById('create-idea-scroll');
      var elmntOffSetTop = elmnt.offsetTop;
      elmnt.scrollIntoView(true);
      window.scroll(0, elmntOffSetTop);
    } catch (e) {
      console.log(e);
    }

    // jQuery.urlParam = function (name) {
    //   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    //   if (results) {
    //     return results[1] || 0;
    //   }
    //   return null;
    // };

    const modelFinalData = () => {
      /**
       * SolutionComponent renders the list of "solution" elements, e.g. AI, Robotics. It acts like a list of checkbox elements allowing multiple elements to be selected
       * @param $element the containing element
       * @param initialValues an array of strings, the names of each element to show in initial selected state
       * @param onChange callback, invoked passing the selection state, pass null for readonly
       * @constructor
       */
      var SolutionComponent = function($element, initialValues, onChange) {
        var self = this;
        this._selectedItemNames = [];
        this._onChange = onChange;
        this._$items = $element.find('li');

        // if (!!onChange) {
        //   this._$items.each(function (idx, li) {
        //     $(li).click(function () {
        //       var name = $(li).find("span").html();
        //       var isSelected = _.indexOf(self._selectedItemNames, name) >= 0;
        //       self.selectItemNamed(name, !isSelected);
        //       return false;
        //     });
        //   });
        // }

        // _.each(initialValues, function (value) {
        //   self.selectItemNamed(value, true);
        // });
      };

      SolutionComponent.prototype.selectItemNamed = function(name, isSelected) {
        var self = this;

        // this._selectedItemNames = _.without(this._selectedItemNames, name);
        if (isSelected) {
          this._selectedItemNames.push(name);
        }

        if (!!this._onChange) {
          this._onChange(this._selectedItemNames);
        }

        this._$items.each(function(idx, li) {
          var itemName = $(li)
            .find('span')
            .html();
          // var isSelected = _.indexOf(self._selectedItemNames, itemName) >= 0;
          $(li).toggleClass('selected', isSelected);
        });
      };

      /**
       * RadioComponent acts like a radio selector, where only one element is selected at a time. This is
       * used for Patentable, Current Project Phase, Market Maturity, Market Impact and Market Size
       * Implemented as a <ul> of <li data-value="1000">1ks</li> where the text value is the name, and data-value is for convenience
       * @param $element the containing element
       * @param initialValue string mapping to initial selection, or a value corresponding to an element's data-value attribute
       * @param onChange passes the display name and data-value (if present) of the selected <li>; pass null for readonly
       * @constructor
       */
      var RadioComponent = function($element, initialValue, onChange) {
        var self = this;
        this._selectedItemName = null;
        this._onChange = onChange;
        this._$items = $element.find('ul li');

        if (!!onChange) {
          this._$items.each(function(idx, li) {
            $(li).click(function() {
              self.selectItemNamed(li.innerHTML);
              return false;
            });
          });
        }

        this.selectItemNamed(initialValue);
      };

      RadioComponent.prototype.selectItemNamed = function(name) {
        var dataValue = null;
        this._$items.each(function(idx, li) {
          var itemName = li.innerHTML;
          var itemValue = $(li).data('value');

          var isSameName = itemName === name;
          var isSameValue = !!itemValue && itemValue === name;
          $(li).toggleClass('selected', isSameName || isSameValue);
          if (isSameName || isSameValue) {
            dataValue = $(li).data('value');
          }
        });

        if (!!this._onChange) {
          this._onChange(name, dataValue);
        }
      };

      /**
       * Represents a slider component with a discrete numeric value. Used for PrototypeEffort, Objective and Market Saturation
       * @param $element the containing element
       * @param minValue the value corresponding to the slider at 0 or leftmost position
       * @param maxValue the value corresponding to the slider at rightmost position
       * @param initialValue the initial value for the slider to display
       * @param onChange called when slider value changes. pass null for readonly
       * @constructor
       */
      var SliderComponent = function($element, minValue, maxValue, initialValue, onChange) {
        this._$element = $element;
        this._$fill = $element.find('.fill');
        this._minValue = minValue;
        this._maxValue = maxValue;
        this._onChange = onChange;
        this._value = null;
        this._dragging = false;
        var self = this;

        if (!!onChange) {
          var valueForMousePosition = function(e) {
            var off = self._$element.offset();
            var x = e.pageX - off.left;
            var width = self._$element.innerWidth();
            return self._minValue + (self._maxValue - self._minValue) * (x / width);
          };

          $element.mousedown(function(e) {
            self._dragging = true;
            self.setValue(valueForMousePosition(e));
            return false;
          });

          $(document).mouseup(function() {
            self._dragging = false;
            return false;
          });

          $element.mousemove(function(e) {
            if (self._dragging) {
              self.setValue(valueForMousePosition(e));
            }
            return false;
          });
        }

        this.setValue(initialValue);
      };

      SliderComponent.prototype.setValue = function(newValue) {
        newValue = Math.min(Math.max(newValue, this._minValue), this._maxValue);
        this._value = newValue;

        var factor = (newValue - this._minValue) / (this._maxValue - this._minValue);
        this._$fill.css({
          width: (factor * 100).toString() + '%'
        });

        if (!!this._onChange) {
          this._onChange(this._value);
        }
      };

      /**
       * Simple editable text component, wrapping an html text element such as <h1>, or <p>
       * @param $element the text element
       * @param onChange called when text value changes; pass null to make read-only
       * @constructor
       */
      var TextEdit = function($element, onChange) {
        this._$element = $element;
        // this._$element.html(initialValue);
        this._$element.toggleClass('textedit', true);
        // this._placeholderString = placeholderString;
        this._onChange = onChange;
        // this._showingPlaceholder = false;

        // this._$element.focus(function () {
        //     if (this._showingPlaceholder) {
        //         this._showingPlaceholder = false;
        //         this._$element.html("");
        //         this._$element.toggleClass("placeholder", false);
        //     }
        // }.bind(this));

        // this._$element.focusout(function () {
        //     this._updatePlaceholderStatus();
        // }.bind(this));

        // this._updatePlaceholderStatus();
        if (!!onChange) {
          // $element.attr("contenteditable", true);
          $element[0].addEventListener('input', function() {
            onChange($element.val());
          });
          onChange($element.val());
        }
      };

      // TextEdit.prototype._updatePlaceholderStatus = function () {
      //     var value = this._$element.html();
      //     if (value.length > 0) {
      //         this._$element.toggleClass("placeholder", false);
      //         this._showingPlaceholder = false;
      //     } else {
      //         this._$element.toggleClass("placeholder", true);
      //         this._$element.html(this._placeholderString);
      //         this._showingPlaceholder = true;
      //     }
      // };

      /**
       * Implemented the area selection mechanism where a button, when tapped, reveals a list of elements which when tapped are moved
       * from the popup to an "active" list. Those elements get a "close" button which move them back to the popup.
       * @param $element the containing element
       * @param initialValues the names of the elements which should be moved from the popup to the active areas list
       * @param maxSelectedAreasCount if > 0, max number of areas user can select
       * @param onChange called when the set of active elements changes, or null to make readonly
       * @constructor
       */
      var AreaSelectorComponent = function($element, initialValues, maxSelectedAreasCount, onChange) {
        var self = this;
        this._$element = $element;
        this._maxSelectedAreasCount = Math.max(maxSelectedAreasCount, 0);
        this._$activeAreaList = $element.find('.active_areas ul');
        this._$button = $element.find('.button');
        this._$areaPopup = this._$button.find('ul');
        this._$button.click(function() {
          if (self._canAddMoreAreasToSelection()) {
            self.showAreaPopup();
          }
          return false;
        });

        $(document).click(function() {
          self.hideAreaPopup();
        });

        // distribute colors must be called before we start moving elements from popup to display area
        this._sortAreas(this._$areaPopup);

        var sat = 70;
        var light = 60;
        this._distributeColors(sat, light);

        if (!!onChange) {
          this._onChange = onChange;
          this._$areaPopup.find('li').click(function() {
            if (self._canAddMoreAreasToSelection()) {
              var name = $(this)
                .find('.name')
                .html();
              self.addArea(name);
              onChange(self.currentSelectedAreas());
              return false;
            }
          });

          this._$areaPopup.find('li .close').click(function() {
            var name = $(this)
              .parent()
              .find('.name')
              .html();
            self.removeArea(name);
            onChange(self.currentSelectedAreas());
            return false;
          });

          onChange(self.currentSelectedAreas());
        }

        for (var i = 0; i < initialValues.length; i++) {
          this.addArea(initialValues[i]);
        }
      };

      AreaSelectorComponent.prototype.showAreaPopup = function() {
        this._$button.toggleClass('active', true);
      };

      AreaSelectorComponent.prototype.hideAreaPopup = function() {
        this._$button.toggleClass('active', false);
      };

      AreaSelectorComponent.prototype.addArea = function(areaName) {
        var $item = this._findArea(areaName, this._$areaPopup);
        if ($item) {
          this._$activeAreaList.append($item);
        }
        this._sortAreas(this._$activeAreaList);
        this._onSelectionChanged();
      };

      AreaSelectorComponent.prototype.removeArea = function(areaName) {
        var $item = this._findArea(areaName, this._$activeAreaList);
        if ($item) {
          this._$areaPopup.append($item);
        }
        this._sortAreas(this._$areaPopup);
        this._onSelectionChanged();
      };

      AreaSelectorComponent.prototype.currentSelectedAreas = function() {
        var areas = [];
        this._$activeAreaList.find('li').each(function() {
          var name = $(this)
            .find('.name')
            .html();
          areas.push(name);
        });
        return areas;
      };

      AreaSelectorComponent.prototype._onSelectionChanged = function() {
        var full = !this._canAddMoreAreasToSelection();
        this._$button.toggleClass('max_reached', full);
        if (full) {
          this.hideAreaPopup();
        }
      };

      AreaSelectorComponent.prototype._canAddMoreAreasToSelection = function() {
        var availableCount = this._$areaPopup.find('li').get().length;
        var selectedCount = this._$activeAreaList.find('li').get().length;
        if (availableCount <= 0) {
          return false;
        }

        if (this._maxSelectedAreasCount > 0) {
          return selectedCount < this._maxSelectedAreasCount;
        }

        return true;
      };

      AreaSelectorComponent.prototype._findArea = function(areaName, $container) {
        var $item = null;
        $container.find('li').each(function() {
          var name = $(this)
            .find('.name')
            .html();
          if (name.toLowerCase() === areaName.toLowerCase()) {
            $item = $(this);
          }
        });
        return $item;
      };

      AreaSelectorComponent.prototype._sortAreas = function($container) {
        $container
          .find('li')
          .sort(function(a, b) {
            var nameA = $(a)
              .find('.name')
              .html();
            var nameB = $(b)
              .find('.name')
              .html();
            return nameA.localeCompare(nameB);
          })
          .appendTo($container);
      };

      AreaSelectorComponent.prototype._distributeColors = function(sat, light) {
        var items = this._$areaPopup.find('li');
        var hueIncrement = 1 / items.length;
        items.each(function(idx) {
          var hue = idx * hueIncrement;
          var hslColorSpec = 'hsl(' + hue * 360 + 'deg, ' + sat + '%, ' + light + '%)';

          $(this).css({
            'background-color': hslColorSpec
          });
        });
      };

      var CardImageComponent = function($element, initialImageUrl, aspectRatio, onChange) {
        this._$element = $element;
        this._$imgElement = this._$element.find('img');
        this._$filePicker = this._$element.find('input');
        this._$instructions = this._$element.find('h3');
        this._hasImage = false;
        this._aspectRatio = aspectRatio;
        this._$element.change(
          function() {
            var file = this._$filePicker[0].files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
              this._$imgElement[0].src = reader.result;
            }.bind(this);

            if (!!file) {
              reader.readAsDataURL(file);
              this._setHasImageFlag(true);
              this.aspectFit();

              if (!!onChange) {
                onChange(file);
              }
            } else {
              this._setHasImageFlag(false);
              if (!!onChange) {
                onChange(null);
              }
            }
          }.bind(this)
        );

        $(window).resize(this.aspectFit.bind(this));
        this.aspectFit();
      };

      CardImageComponent.prototype._setHasImageFlag = function(hasImage) {
        this._hasImage = !!hasImage;
        this._$element.toggleClass('has_image', this._hasImage);
        this._$instructions.html(hasImage ? 'Change image.. &nbsp&nbsp' : 'Upload image...');
      };

      CardImageComponent.prototype.aspectFit = function() {
        var containerWidth = this._$element.innerWidth();
        this._$element.css({
          height: containerWidth / this._aspectRatio
        });
      };

      var QRCodeComponent = function($element, initialUrl, initialShortCode) {
        this._$qrCodeText = $element.find('span');
        // this._generator = new QRCode("idea_qrcode_holder", {
        //   width: 64,
        //   height: 64,
        //   colorDark: "#445",
        //   colorLight: "#ffffff",
        // });

        if (!!initialUrl) {
          $element.find('img.placeholder').remove();
          // this._generator.makeCode(initialUrl);
        }

        if (!!initialShortCode && initialShortCode.length > 0) {
          this._$qrCodeText.html(initialShortCode);
        }
      };

      document.components = {
        QRCodeComponent: QRCodeComponent,
        AreaSelectorComponent: AreaSelectorComponent,
        RadioComponent: RadioComponent,
        TextEdit: TextEdit,
        SolutionComponent: SolutionComponent,
        SliderComponent: SliderComponent,
        CardImageComponent: CardImageComponent
      };
    };

    modelFinalData();

    const modelInitialData = propValues => {
      //
      //  Constants
      //

      var MaxDescriptionLength = 140;
      var MaxSelectedAreasCount = 5;

      /**
       * CardModel represents the model behind an idea card. It is meant to be persistable to/from JSON
       * @constructor
       */
      var CardModel = function() {
        this.document_url = '';
        this.project_codename = '';
        this.title = '';
        this.subtitle = '';
        this.author_name = [];
        this.description = '';
        this.areas = []; // array of strings from AreaListElements
        this.solutions = []; // array of strings
        this.patent_status = ''; // one of ["No IP", "Patentable", "Submitted"]
        this.project_phase = ''; // one of ["Pitch", "Ideation", "Concept", "Prototype", "Alpha", "Beta", "V1"]
        this.prototype_effort_weeks = '';
        this.objective = '';
        this.market_saturation = '';
        this.market_maturity_years = '';
        this.market_impact = ''; // one of MarketImpact
        this.market_size = '';
        this.image_url = '';

        this.onLoaded = function() {};
      };

      CardModel.prototype.validate = function() {
        // this.description = $("#idea_description").val();
        // this.title = $("#idea_title").val();
        // this.subtitle = $("#idea_subtitle").val();
        // TODO check model intial values above
        return (
          this.title != '' &&
          this.title.length > 0 &&
          this.subtitle != '' &&
          this.subtitle.length > 0 &&
          // this.author_name && this.author_name!== 'undefined' && this.author_name.length > 0 &&
          this.description != '' &&
          this.description.length > 0 &&
          this.patent_status != '' &&
          !!this.project_phase &&
          this.project_phase.length > 0 &&
          this.prototype_effort_weeks != '' &&
          // this.prototype_effort_weeks >= 0 &&
          !!this.objective &&
          this.objective.length >= 0 &&
          this.market_saturation != '' &&
          // this.market_saturation >= 0 &&
          !!this.market_maturity_years &&
          this.market_maturity_years.length >= 0 &&
          !!this.market_impact &&
          this.market_impact.length >= 0 &&
          this.market_size != null &&
          this.market_size != '' &&
          this.areas.length > 0 &&
          this.solutions.length > 0 &&
          this.image_url != ''
        );
      };

      CardModel.prototype.load = function(documentId, documentUrl) {
        this.document_url = documentUrl;
        this.project_codename = documentId;

        setTimeout(
          function() {
            this.onLoaded();
          }.bind(this),
          200
        );
      };

      CardModel.prototype.createNewCard = function(documentId, documentUrl) {
        this.document_url = documentUrl;
        this.document_id = documentId;
        this.onLoaded();
      };

      CardModel.prototype.saveIdea = this.saveIdea;

      CardModel.prototype.saveIdeaSuccess = this.saveIdeaSuccess;

      CardModel.prototype.saveIdeaError = this.saveIdeaError;

      CardModel.prototype.save = function(app, saveDialog) {
        var jsonString = JSON.stringify(this, null, ' ');
        var jsonLiteral = JSON.parse(jsonString);
        // var ideaCard = this.ic || new IdeaCardApi();
        var imageFile = document.getElementById('idea_image_upload').files[0];
        try {
          if (jsonLiteral.title) {
            jsonLiteral.title = jsonLiteral.title.replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, '');
          }
          if (jsonLiteral.subtitle) {
            jsonLiteral.subtitle = jsonLiteral.subtitle.replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, '');
          }
          if (jsonLiteral.description) {
            jsonLiteral.description = jsonLiteral.description.replace(/<[^>]+>/g, '').replace(/\&nbsp;/g, '');
          }
        } catch (e) {
          console.log(e);
        }

        this.saveIdea(app, jsonLiteral, imageFile, message => {
          if (message == 'A page with this title already exist') {
            try {
              saveDialog.remove();
            } catch (e) {
              if (e instanceof ReferenceError) {
                console.log(e);
              }
            }
            // var titleNameErrorDialog = new AJS.Dialog({
            //   width: 350,
            //   height: 210,
            //   id: "title-name-error-dialog",
            //   closeOnOutsideClick: false,
            //   keypressListener: function (e) {
            //     if (e.keyCode == 27) {
            //       titleNameErrorDialog.show();
            //     }
            //   }
            // });
            // // titleNameErrorDialog.addPanel(
            //   "Panel 1",
            //   '<p style="color:red;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Error </p>' +
            //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">An Idea with this title already exists.</p>' +
            //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Please choose a different title.</p>',
            //   "panel-body"
            // );
            // titleNameErrorDialog.addButton("Ok", function (dialog) {
            //   titleNameErrorDialog.hide();
            // });
            // titleNameErrorDialog.show();
          } else if (message === 'No Authors Found') {
            try {
              saveDialog.remove();
            } catch (e) {
              if (e instanceof ReferenceError) {
                // catch Error
              }
            }
            // var authorNameErrorDialog = new AJS.Dialog({
            //   width: 340,
            //   height: 213,
            //   id: "title-name-error-dialog",
            //   closeOnOutsideClick: false,
            //   keypressListener: function (e) {
            //     if (e.keyCode == 27) {
            //       authorNameErrorDialog.show();
            //     }
            //   }
            // });
            // authorNameErrorDialog.addPanel(
            //   "Panel 1",
            //   '<p style="color:red;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Error </p>' +
            //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Author field cannot be empty.</p>' +
            //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Please tag authors.</p>',
            //   "panel-body"
            // );
            // authorNameErrorDialog.addButton("Ok", function (dialog) {
            //   authorNameErrorDialog.hide();
            // });
            // authorNameErrorDialog.show();
          } else if (message === undefined) {
            try {
              saveDialog.remove();
            } catch (e) {
              if (e instanceof ReferenceError) {
                // catch Error
              }
            }
            this.saveIdeaSuccess();
          } else {
            try {
              saveDialog.remove();
            } catch (e) {
              if (e instanceof ReferenceError) {
                // catch Error
              }
            }
            if (jsonLiteral.title && jsonLiteral.title.length > 255) {
              // var titleLengthErrorDialog = new AJS.Dialog({
              //   width: 350,
              //   height: 213,
              //   id: "title-length-error-dialog",
              //   closeOnOutsideClick: false,
              //   keypressListener: function (e) {
              //     if (e.keyCode == 27) {
              //       titleLengthErrorDialog.show();
              //     }
              //   }
              // });
              // titleLengthErrorDialog.addPanel(
              //   "Panel 1",
              //   '<p style="color:red;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Error </p>' +
              //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Title cannot be more than 255 characters.</p>' +
              //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Please choose a different title.</p>',
              //   "panel-body"
              // );
              // titleLengthErrorDialog.addButton("Ok", function (dialog) {
              //   titleLengthErrorDialog.hide();
              // });
              // titleLengthErrorDialog.show();
            } else {
              this.saveIdeaError();
            }
          }
        });
        // this.ic = ideaCard;
        console.log('CardModel::save - json: \n' + jsonLiteral);
      };

      //
      //  Finally, the app
      //

      var App = function(model, isEditor, propValues) {
        this._model = model;
        this._propValues = propValues;
        this._model.onLoaded = this._onReady.bind(this);
        this._cardContainer = $('.card_container');
        this._card = $('#idea_card');
        this.setIsEditor(isEditor);
      };

      App.prototype.setIsEditor = function(isEditor) {
        this._isEditor = !!isEditor;
        this._cardContainer.toggleClass('edit', this._isEditor);
        this._cardContainer.toggleClass('presentation', !this._isEditor);

        if (!!this._cardImage) {
          this._cardImage.aspectFit();
        }
      };

      App.prototype.isEditor = function() {
        return this._isEditor;
      };

      App.prototype.validate = function() {
        var valid = this._model.validate();
        this._$saveButton.toggleClass('disabled', !valid);
      };

      App.prototype._onReady = function() {
        this._card.toggleClass('loading', false);
        this._build(this._isEditor, this._propValues);
      };

      App.prototype.printCard = function() {
        this._renderCardToCanvas(
          function(canvas, onDone) {
            window.print();
            onDone();
          }.bind(this)
        );
      };

      // App.prototype.saveCard = function () {
      //   this._renderCardToCanvas(
      //     function (canvas, onDone) {
      //       ReImg.fromCanvas(canvas).downloadPng(
      //         "Card-" + this._model.project_codename
      //       );
      //       onDone();
      //     }.bind(this)
      //   );
      // };

      App.prototype._renderCardToCanvas = function(onReady) {
        //
        //  Use html2canvas to render #idea_card - but we have to
        //  un-center the card because of html2canvas limitations. So we
        //  toggle a render_to_canvas class on body while generating...
        //

        var inEditMode = this.isEditor();
        this.setIsEditor(false);
        $('svg').remove();
        $('body').toggleClass('render_to_canvas', true);
        var element = $('#idea_card')[0];

        var title_scroll_height = $('#idea_title').get(0).scrollHeight;
        $('#idea_title').css('height', title_scroll_height + 'px');

        var subtitle_scroll_height = $('#idea_subtitle').get(0).scrollHeight;
        $('#idea_subtitle').css('height', subtitle_scroll_height + 'px');

        var description_scroll_height = $('#idea_description').get(0).scrollHeight;
        $('#idea_description').css('height', description_scroll_height + 'px');

        var node = document.createElement('DIV');
        node.style.marginBottom = '25px';
        var textnode = document.createTextNode('');
        node.appendChild(textnode);
        element.appendChild(node);

        // html2canvas(element, { useCORS: true, scale: 2 }).then(
        //   function (canvas) {
        //     $("body").toggleClass("render_to_canvas", false);
        //     $(".card_print_container")
        //       .empty()
        //       .append(canvas);
        //     canvas.id = "card_canvas";

        //     onReady(
        //       canvas,
        //       function () {
        //         this.setIsEditor(inEditMode);
        //       }.bind(this)
        //     );
        //   }.bind(this)
        // );
      };

      App.prototype._build = function(editable, propValues) {
        var model = this._model;
        var components = document.components;

        this._$saveButton = $('#button_save');
        this._$saveButton.click(
          function(event) {
            try {
              $('#min-height-720').css('min-height', '900px');
            } catch (e) {
              console.log(e);
            }
            event.preventDefault();

            this._model.validate();

            // var saveDialog = new AJS.Dialog({
            //   width: 215,
            //   height: 225,
            //   id: "save-dialog",
            //   closeOnOutsideClick: false,
            //   keypressListener: function (e) {
            //     if (e.keyCode == 27) {
            //       saveDialog.show();
            //     }
            //   }
            // });
            // saveDialog.addHeader("Please wait");
            // saveDialog.addPanel(
            //   "Panel 1",
            //   '<p class="saving-idea-text">Saving your idea...</p>' +
            //   '<div class="block saving-idea-loader">' +
            //   '<span class="ouro ouro3">' +
            //   '<span class="left"> ' +
            //   '<span class="anim"></span>' +
            //   " </span>" +
            //   '<span class="right">' +
            //   '<span class="anim"></span>' +
            //   "</span>" +
            //   "</span>" +
            //   "</div>",
            //   "panel-body"
            // );
            // saveDialog.show();

            // this._onSave(saveDialog);
            return false;
          }.bind(this)
        );

        this._$cancelButton = $('#button_cancel');
        this._$cancelButton.click(
          function() {
            // var confirmationDialog = new AJS.Dialog({
            //   width: 390,
            //   height: 135,
            //   id: "confirmation-dialog",
            //   closeOnOutsideClick: false,
            //   keypressListener: function (e) {
            //     if (e.keyCode == 27) {
            //       confirmationDialog.show();
            //     }
            //   }
            // });
            // confirmationDialog.addPanel(
            //   "Panel 1",
            //   '<p style="font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;">Are you sure you want to discard the changes.</p>',
            //   "panel-body"
            // );

            // confirmationDialog.addButton(
            //   '<div style="color:red;">Yes</div>',
            //   function () {
            //     propValues.click();
            //     confirmationDialog.hide();
            //   }
            // );
            // confirmationDialog.addButton(
            //   '<div style="color:#3572b0;">No</div>',
            //   function (dialog) {
            //     confirmationDialog.hide();
            //   }
            // );

            try {
              if (
                this._model.title.length === 0 &&
                this._model.subtitle.length === 0 &&
                this._model.description.length === 0 &&
                this._model.areas.length === 0 &&
                this._model.solutions.length === 0 &&
                this._model.patent_status.length === 0 &&
                this._model.project_phase.length === 0 &&
                this._model.prototype_effort_weeks === 0 &&
                this._model.market_saturation === 0 &&
                this._model.market_impact.length === 0 &&
                this._model.objective.length === 0 &&
                this._model.market_maturity_years.length === 0 &&
                this._model.market_size === null
              ) {
                if (this._model.image_url !== null && this._model.image_url.length === 0) {
                  propValues.click();
                } else if (this._model.image_url === null) {
                  propValues.click();
                } else {
                  // confirmationDialog.show();
                }
              } else {
                // confirmationDialog.show();
              }
            } catch (e) {
              if (e instanceof ReferenceError) {
                // catch Error
              }
            }

            try {
              // savedialog.remove();
            } catch (e) {
              if (e instanceof ReferenceError) {
                // catch Error
              }
            }
            return false;
          }.bind(this)
        );

        $('#idea_qrcode_holder').empty();
        this._qrCode = new components.QRCodeComponent($('#idea_qr_code'), model.document_url, model.project_codename);

        this._areaSelector = new components.AreaSelectorComponent(
          $('#idea_area_list'),
          model.areas,
          MaxSelectedAreasCount,
          editable
            ? function(newAreas) {
                model.areas = newAreas;
                this.validate();
              }.bind(this)
            : null
        );

        this._titleTextEdit = new components.TextEdit(
          $('#idea_title'),
          function(newTitle) {
            // TODO with regex to remove style tag
            // var startIndex = newTitle.indexOf(`<style type="text/css">`);
            // var endIndex = newTitle.indexOf("</style>");
            // if(startIndex != -1 && endIndex != -1){
            //   var styleTagText = startIndex && endIndex && newTitle.substring(startIndex, endIndex+8);
            //   newTitle = newTitle.replace(styleTagText, '');
            // }
            newTitle = newTitle && newTitle.replace(/<[^>]+>/g, '');
            newTitle = newTitle && newTitle.replace(/\&nbsp;/g, '');
            newTitle = newTitle && newTitle.trim();

            this._model.title = newTitle;
            this.validate();
          }.bind(this)
        );

        this._subTitleTextEdit = new components.TextEdit(
          $('#idea_subtitle'),
          function(newSubtitle) {
            // TODO with regex to remove style tag
            // var startIndex = newSubtitle.indexOf(`<style type="text/css">`);
            // var endIndex = newSubtitle.indexOf("</style>");
            // if(startIndex != -1 && endIndex != -1){
            //   var styleTagText = startIndex && endIndex && newSubtitle.substring(startIndex, endIndex+8);
            //   newSubtitle = newSubtitle.replace(styleTagText, '');
            // }
            newSubtitle = newSubtitle && newSubtitle.replace(/<[^>]+>/g, '');
            newSubtitle = newSubtitle && newSubtitle.replace(/\&nbsp;/g, '');
            newSubtitle = newSubtitle && newSubtitle.trim();

            this._model.subtitle = newSubtitle;
            this.validate();
          }.bind(this)
        );

        // this._authorNameTextEdit = new components.TextEdit(
        //   $("#idea_author"),
        //   function (selectedAuthors) {
        //     // var scroll_height = $("#idea_author").get(0).scrollHeight;
        //     // $("#idea_author").css('height', scroll_height + 'px');
        //     // selectedAuthors = selectedAuthors && selectedAuthors.replace(/<[^>]+>/g, '');
        //     // selectedAuthors = selectedAuthors && selectedAuthors.replace(/\&nbsp;/g, '');
        //     // selectedAuthors = selectedAuthors && selectedAuthors.trim();
        //     // if (selectedAuthors === "") {
        //     //   $("#idea_author").css('height', '');
        //     // }
        //     this._model.author_name = selectedAuthors;
        //     this.validate();
        //   }.bind(this)
        // );

        // $("#idea_author").click(() => {
        //     var obj = new CardModel();
        //     obj.validate();
        // });

        this._descriptionTextEdit = new components.TextEdit(
          $('#idea_description'),
          function(newDesc) {
            // TODO with regex to remove style tag
            // var startIndex = newDesc.indexOf(`<style type="text/css">`);
            // var endIndex = newDesc.indexOf("</style>");
            // if(startIndex != -1 && endIndex != -1){
            //   var styleTagText = startIndex && endIndex && newDesc.substring(startIndex, endIndex+8);
            //   newDesc = newDesc.replace(styleTagText, '');
            // }
            newDesc = newDesc && newDesc.replace(/<[^>]+>/g, '');
            newDesc = newDesc && newDesc.replace(/\&nbsp;/g, '');
            newDesc = newDesc && newDesc.trim();

            this._model.description = newDesc;
            this.validate();

            // var remainingCharCountElement = $("#idea_description_text_character_count");
            // var remainingCharCount = MaxDescriptionLength - model.description.length;
            // remainingCharCountElement.toggleClass("overflow", remainingCharCount < 10);
            // remainingCharCountElement.html("(" + remainingCharCount + " remaining characters)");
          }.bind(this)
        );

        this._solutionsSelector = new components.SolutionComponent(
          $('#idea_solutions_picker'),
          model.solutions,
          editable
            ? function(newValues) {
                this._model.solutions = newValues;
                this.validate();
              }.bind(this)
            : null
        );

        this._patentRadio = new components.RadioComponent(
          $('#idea_patentable'),
          model.patent_status,
          editable
            ? function(newPatentStatus) {
                model.patent_status = newPatentStatus;
                this.validate();
              }.bind(this)
            : null
        );

        this._currentProjectPhaseRadio = new components.RadioComponent(
          $('#idea_project_phase'),
          model.project_phase,
          editable
            ? function(newValue) {
                this._model.project_phase = newValue;
                this.validate();
              }.bind(this)
            : null
        );

        this._objectiveRadio = new components.RadioComponent(
          $('#idea_objective'),
          model.objective,
          editable
            ? function(newName) {
                this._model.objective = newName;
                this.validate();
              }.bind(this)
            : null
        );

        this._marketMaturityRadio = new components.RadioComponent(
          $('#idea_market_maturity'),
          model.market_maturity_years,
          editable
            ? function(newName) {
                this._model.market_maturity_years = newName;
                this.validate();
              }.bind(this)
            : null
        );

        this._marketImpactRadio = new components.RadioComponent(
          $('#idea_market_impact'),
          model.market_impact,
          editable
            ? function(newName) {
                this._model.market_impact = newName;
                this.validate();
              }.bind(this)
            : null
        );

        this._marketSizeRadio = new components.RadioComponent(
          $('#idea_market_size'),
          model.market_size,
          editable
            ? function(newName, newValue) {
                this._model.market_size = newValue;
                this.validate();
              }.bind(this)
            : null
        );

        this._marketSaturation = new components.SliderComponent(
          $('#idea_market_saturation'),
          0,
          100,
          model.market_saturation * 100,
          editable
            ? function(newValue) {
                newValue /= 100;
                this._model.market_saturation = newValue;
                this.validate();
              }.bind(this)
            : null
        );

        this._prototypeEffortSlider = new components.SliderComponent(
          $('#idea_prototype_effort'),
          0,
          16,
          model.prototype_effort_weeks,
          editable
            ? function(newValue) {
                newValue = Math.round(newValue);
                this._model.prototype_effort_weeks = newValue;
                this.validate();
              }.bind(this)
            : null
        );

        var aspectRatio = 2;
        this._cardImage = new components.CardImageComponent(
          $('#idea_card_image'),
          model.image_url,
          aspectRatio,
          editable
            ? function(fileObj) {
                console.log('fileObj: ' + fileObj);
                this._model.image_url = fileObj;
                this.validate();
              }.bind(this)
            : null
        );

        this.validate();
      };

      App.prototype._onSave = function(saveDialog) {
        this._model.save(this, saveDialog);
      };

      // App.prototype._onCancel = function (message) {
      //   AP.require("dialog", function (dialog) {
      //     dialog.close(message);
      //   });
      //   console.log("User cancelled -- close popup? Or something else?");
      // };

      var model = new CardModel();
      var isEditor = true; //$.urlParam("mode") === "edit";
      var cardId = '1122';

      document.IdeaCard = {};
      document.IdeaCard.app = new App(model, isEditor, propValues);

      if (cardId != null) {
        // we're either viewing or editing an existing card
        model.load(cardId, 'http://url/to/card');
      } else {
        // is this a new card?
        model.createNewCard(cardId, 'http://url/to/card');
      }
    };

    modelInitialData(this.props);
  }

  render() {
    return (
      <div id="min-height-720">
        <div id="create-idea-scroll">
          <div className="col-lg-6 col-md-6 col-sm-6 download-print-div create-new-idea-div">
            <a className="gallery-link">
              <i className="fa fa-chevron-left gallery-icon" />
            </a>
            <p className="gallery-text create-new-idea-text"> Create New Idea</p>
          </div>
          <hr className="hr-for-idea-card marginTop-5" />
          <div className="card_container save-card-container">
            <div className="card loading save-idea-card" id="idea_card">
              <div className="area_list_row" id="idea_area_list">
                <div className="button">
                  <span className="trigger">Add problem space(s)...</span>
                  <span className="full_message">Full</span>
                  <ul>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Climate</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Pandemics</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Health</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Education</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Productivity</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Technology</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Space</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Science</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Culture</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Energy</span>
                    </li>
                    <li>
                      <span className="close">✕</span>
                      <span className="name">Ecology</span>
                    </li>
                  </ul>
                </div>
                <div className="active_areas">
                  <ul />
                </div>
              </div>

              <header className="saveidea-header">
                <div className="title">
                  <div className="idea_qrcode" id="idea_qr_code">
                    <div className="qrcode_holder" id="idea_qrcode_holder">
                      <img className="placeholder" crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/qr_placeholder.png" />
                    </div>
                    {/* <span>AR-C01</span> */}
                  </div>
                  <div className="titles">
                    <textarea className="title_text textarea-placeholder" id="idea_title" rows="1" name="title" placeholder="Enter title" />
                    <br />
                    <textarea className="subtitle_text textarea-placeholder" id="idea_subtitle" rows="1" name="subtitle" placeholder="Enter subtitle" />
                    {/* <textarea className="subtitle_text author_text textarea-placeholder" id="idea_author" rows="1" name="author-name" placeholder="Author name">
                  </textarea> */}
                    <Select
                      className="author_text"
                      id="idea_author"
                      value={[]}
                      // onChange={this.handleChange}
                      // options={this.state.allAuthors}
                      isMulti={true}
                      placeholder="Tag authors"
                      closeMenuOnScroll={true}
                    />

                    {/* <input type="text" id="idea_title" name="title" placeholder="Enter title..." value=""/>
              <input type="text" id="idea_subtitle" name="subtitle" placeholder="Enter subtitle..." value=""/> */}
                    {/* <h1 id="idea_title">Select to enter title</h1> */}
                    {/* <h2 id="idea_subtitle">Select to enter subtitle</h2> */}
                  </div>
                </div>
                <ul className="solutions" id="idea_solutions_picker">
                  <li className="robotics">
                    <p className="action-msg">Select all that apply</p>
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/AI_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/AI_Color@4x.png" className="active" />
                    <span>AI</span>
                  </li>
                  <li className="robotics mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Robotics_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Robotics_Color@4x.png" className="active" />
                    <span>Robotics</span>
                  </li>
                  <li className="drones mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Drones_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Drones_Color@4x.png" className="active" />
                    <span>Drones</span>
                  </li>
                  <li className="iot mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/IoT_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/IoT_Color@4x.png" className="active" />
                    <span>IoT</span>
                  </li>
                  <li className="personalization mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Personalization_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Personalization_Color@4x.png" className="active" />
                    <span>Personalization</span>
                  </li>
                  <li className="ar mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/AR_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/AR_Color@4x.png" className="active" />
                    <span>AR</span>
                  </li>
                  <li className="medicine mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Medicine_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Medicine_Color@4x.png" className="active" />
                    <span>Medicine</span>
                  </li>
                  <li className="context mt-37">
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Context_Grey@4x.png" className="inactive" />
                    <img crossOrigin="Anonymous" src="https://vulcan-ic-images.s3.amazonaws.com/Context_Color@4x.png" className="active" />
                    <span>Context</span>
                  </li>
                </ul>
              </header>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="description">
                <div className="description_text_wrapper">
                  {/* <p className="description_text" id="idea_description"></p> */}
                  <textarea className="description_text textarea-placeholder" id="idea_description" rows="5" name="description" placeholder="Enter description" />
                  {/* <span className="character_count" id="idea_description_text_character_count">100 character limit</span> */}
                </div>
              </div>

              <div className="elements">
                <div className="col save-col">
                  <p className="action-msg-with-guess">Select values for each field below (if unsure, go with your best guess)</p>
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <h3>
                            Patentable
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_radio" id="idea_patentable">
                            <ul>
                              <li>No IP</li>
                              <li>Patentable</li>
                              <li>Submitted</li>
                            </ul>
                          </div>
                        </td>
                        <td />
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <h3>
                            Current Project Phase
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_radio" id="idea_project_phase">
                            <ul>
                              <li>Pitch</li>
                              <li>Ideation</li>
                              <li>Concept</li>
                              <li>Prototype</li>
                              <li>Alpha</li>
                              <li>Beta</li>
                              <li>V1</li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3>
                            Prototype Effort
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_slider" id="idea_prototype_effort">
                            <div className="fill" />
                            <ul>
                              <li>0</li>
                              <li>8wks</li>
                              <li>16wks</li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <h3>
                            Objective
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_radio" id="idea_objective">
                            <ul>
                              <li>Research</li>
                              <li>Product</li>
                              <li>Research and Product</li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <h3>
                            Market Saturation
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_slider" id="idea_market_saturation">
                            <div className="fill" />
                            <ul>
                              <li>0</li>
                              <li>100%</li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <h3>
                            Market Maturity
                            <a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new">
                              Docs...
                            </a>
                          </h3>
                          <div className="ui_radio" id="idea_market_maturity">
                            <ul>
                              <li>1-3 yrs</li>
                              <li>3-5 yrs</li>
                              <li>5-10 yrs</li>
                              <li>10+ yrs</li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <h3>
                            Market Impact<a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new" />
                          </h3>
                          <div className="ui_radio" id="idea_market_impact">
                            <ul>
                              <li>Value Add</li>
                              <li>Differentiative</li>
                              <li>Disruptive</li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <h3>
                            Market Size<a className="documentation_link" href="https://vulcan.atlassian.net/wiki/spaces/FOR/" target="_new" />
                          </h3>
                          <div className="ui_radio" id="idea_market_size">
                            <ul>
                              <li data-value="1000">1ks</li>
                              <li data-value="10000">10ks</li>
                              <li data-value="100000">100ks</li>
                              <li data-value="1000000">Million+</li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col wide">
                  <div className="card_image_container p-20" id="idea_card_image">
                    <div className="image_holder">
                      <img id="idea_image" />
                    </div>
                    <div className="upload_ui upload-image-div">
                      <h3 className="upload-image-text">Upload image...</h3>
                      <br />
                      <input type="file" id="idea_image_upload" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-for-idea-card" />

          <footer className="idea-card-footer">
            <Row>
              {/* <Col lg="8" md="7" className="mandatory-text">
                <h7>All fields are mandatory to save</h7>
              </Col>
              <Col lg="1" md="2" className="cancel-btn-div">
                <span className="button cancel-btn" id="button_cancel">Cancel</span>
              </Col> */}
              <Col lg="3" md="3" className="save-btn-div">
                <span className="button save-btn" id="button_save">
                  Save
                </span>
              </Col>
            </Row>
          </footer>

          <div className="card_print_container" />
        </div>
      </div>
    );
  }
}

export default Faq;
