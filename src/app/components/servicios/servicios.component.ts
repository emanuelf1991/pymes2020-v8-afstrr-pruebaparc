import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";
import { ServicioService } from "../../services/servicio.service";
import { Servicio } from "../../models/servicio";

@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  Titulo = "Articulos";
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Servicio[] = [];
  RegistrosTotal: number;
  // Familias: ArticuloFamilia[] = [];
  SinBusquedasRealizadas = true;

  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: "" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" }
  ];

  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    //private articulosService: ArticulosService,
    //private articulosFamiliasService: ArticulosFamiliasService,
    private modalDialogService: ModalDialogService,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    this.FormFiltro = this.formBuilder.group({
      Nombre: [""],
      Activo: [null]
    });
    this.FormReg = this.formBuilder.group({
      IdArticulo: [0],
      Nombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      Precio: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Stock: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      CodigoDeBarra: [
        "",
        [Validators.required, Validators.pattern("[0-9]{13}")]
      ],
      IdArticuloFamilia: ["", [Validators.required]],
      FechaAlta: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}"
          )
        ]
      ],
      Activo: [true]
    });

    // this.GetFamiliasArticulos();
  }

  //GetFamiliasArticulos() {
  //this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
  // this.Familias = res;
  //});
  //}

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  // Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.servicioService.get().subscribe((res: any) => {
      this.Lista = res.Lista;
      this.RegistrosTotal = res.RegistrosTotal;
    });
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (itemCopy.IdArticulo == 0 || itemCopy.IdArticulo == null) {
      itemCopy.IdArticulo = 0;
      this.servicioService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
        this.Buscar();
      });
    } else {
      // modificar put
      // this.articulosService
      // .put(itemCopy.IdArticulo, itemCopy)
      //.subscribe((res: any) => {
      // this.Volver();
      //this.modalDialogService.Alert('Registro modificado correctamente.');
      //this.Buscar();
      //});
    }
  }

  // representa la baja logica

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

  ImprimirListado() {
    this.modalDialogService.Alert("Sin desarrollar...");
  }

  // GetArticuloFamiliaNombre(Id){
  // var ArticuloFamilia = this.Familias.filter(x => x.IdArticuloFamilia === Id)[0];
  //if (ArticuloFamilia)
  //   return ArticuloFamilia.Nombre;
  //else
  // return "";
  //}
}
