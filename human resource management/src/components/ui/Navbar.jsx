import { FaBell, FaCog, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ searchValue, onSearchChange, profile }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-3">
      {/* Left: Search */}
      <div className="flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={onSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Email */}
        <div className="relative">
          <FaEnvelope className="text-gray-600 text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
            0
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
            0
          </span>
        </div>

        {/* Settings */}
        <div onClick={() => navigate("/settings")}>
          <FaCog className="text-gray-600 text-xl cursor-pointer" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={
              profile?.image ||
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFhUXGBgYGBgXGBcYGhkYFxcXGhgYGhoYHSggGBolGxcXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGisfIB8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTctKystLf/AABEIAOEA4AMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EADsQAAEDAgMFBgUDAwMFAQAAAAEAAhEDIQQFMRJBUWFxBiKBkaHBEzKx0fBC4fEUYnIHI1IzQ5Kiwhb/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QAJhEAAgICAgEFAQADAQAAAAAAAAECEQMhEjEEEyIyQVFhFSNCFP/aAAwDAQACEQMRAD8AzmcNktHJBsxsCjOaHvtG+EHzSPFczB9Hcl0yvhDZaPBuGzpCzuEbYLRUD3dEc/YsehKjPzcoKgtskW9R0U5co3nx9lUnQGirh/8AZdJIg6cHDgo8VmbGkBlw7T3B5hUc+BBa3aOwfQ8ULwztkmm7f8p/u/SRyOi3wxqUeRS/KcPahMyzB7jBNlDhHQyoeIj0P7Kxi8AfhfFJ36b1TY0hrvH2WqKSWjDkm5StlYLinMZKmpYYmTBMJrK6ZHRokrY//lm08Kajz3iJCzlKi62yCei1VPAYvEUwHy2mAJGiy+RJ6p0aMEVu0YujQLjAC02A7M1NkF9mlFcNhqOGuBtOCpZt2kqVbAbIHBJLLKeolkcMYu2FqOGoU6D7Bxa0/wDrIHo/0QWpnZ2KgbAADQI5u+wKZk9Rz6eKZv8AhOcPL9moh2G7Mf1QLnnuh4tx2Qfuh6Sq5uwvLx1EM9kKhfRBMyjjzuH8lOdgmUSWUwNI8FFuXnPMSWRtHXwO4IR2iYQpAE2oVlRcG8i+QomEJyF1j1RWFsxfEzZPkcucUiUqwQVhUoaq7H8FZ2rJ4OxZHjuZkmrrog+ZIxiz/uOMIPmb5iy6WD6BPoXB7keZOyEDwg0utA0WEoZvkKuiOUxOdCYdYCrAAu0NTvNIG6/NDhhS9nduR8vjfZ9JC1FfJvjEFxho14lG8pyJgADGxNjP6xr/AOQ3FaY+XGEUvszy8dzk2YY0H1WtJJ2TZ3+QgE+Ig+aLVsipmmS11w2DzPcgrXY7J6TQ6Gw03PM79UINek1kToNYN7xHokflyl8Qrx4rsF9mezrHtJed5j6EfnBaHL+z1OmTv2rEHkT+yXD0CGB7dSHW5kAyPEFV+zmdOqVHU3jvAm56aKqebLO5RfRZHFCOmaHJ8lpXAaBccOf2R3MMLLRA0O4XKH06gY1k2uAesmEWq1IAPD6LK8sm9ss9OKMxmWU0y8OIjpyufugea5JRqEubYwNqIjr1uFss/wAKX0SWHZIBg8yIHrCx+Q1DUpEEEEEg+HPgnjkmvcmHjF6orZRQFMPOwRDSwmNROqKZfVdRGzTYBtFx5CIv1sqXaCs6hLo2hOm6C2PKSPNVso7QCq4NHS6t55Gua6EcMd8WHqeMDtpzrHnpAsAFM0zcKWphgQARA1t78pA81BSpS7umBGnjHsubnSye77NeL2aJAExycSkqBYqpmjsKZA75gjAQPInAPI4hHYWvF0Z8nYgSuK5KVYVjALqzsyoWKy1WweiufZ4viKg+I+UJzBET8zjG9C8aTtLp4lsk37SzgmgkSjuzAHBA8DqLWRwgmAAVVl+RPoiFMuP5qiuGwQA713Aaa2+6XLsBBkm53Rp+60tDAhpJhxJ6X+yoySpEj2C8LQDhNrcjpFkcwuE7o3RvHDcooAMQeFgNOEzKv4RrQLOtqsrlvZbWjNdt6vwqJI1m++x1WB7K4I1qoBu3XpcH6lendosOKtMtjXpdBuy2Wig0i0yT7R4ELTj8hRxtVsqlibkmFnYWGw20R5T+6zeCyc08U582Ljf0/wDlayu/nuT8Jhw+Dumfqq45JJP+jyihzsBt8I48D+FEsJgyGQbq3haMAWsrhbaFUK5Ak0IaQsvhMu+FVeB+pxMe/rHgtrUQbNRstLwLj9kd9DRYEzLKvjUy12/eORkLy+hltSlihSIJ2XiefBey4TEAjd+SqGMwDDUDwBP5qrMOeWJOP6CeJTaf4XqOGlmm7+PK6oYnud2CSeA068PZF21wBH0Ggm0c1RzHG02hZmrLUyk9l5JHW9/vwUYYXA7k4VC++0BG6C6P3V51UOGzM/ZLKH6OpEOT/wDUWiJWboE0Xy75Nx5+CPUK4eJCOOPFCZHbJikKRK1WCDqasjRVhqrTBZW4yuZ4gxx73UoVi/mgInTEgnqheI+ZdTEtgn0ghl4uLLZZNgyRLm7xHMdVnuzeX/EdJmBw9+C3uApj5WmSNZ3DjI1WbLNKWiVaLDMIJnYM26eBKjxD9gHaYfDgOvRW6+I+GyJJjivK+2HbCo9xYwwBIPPoq8WJ5ZaFnNQVsP5j2pw7Ld5p6k/XRSZb2ypOMF/TSV5aKL33Ngd7l39INz2ytz8DG1tmZeXJfR7UMc14BDgRvUb6t7a+hXlWAzitQMOu3jr6rbZVmjazQQZG8eCyZPD9P+o1Q8hTC2IquL4numx8bI7kp2QB+fllnA7ejWBJtGllW4qgt7NZh32U8qhhnq2xZ2RoSsheZMljhyRSrCo4hhINkE9hRmgeWv5KSpid34ApsXT2dBosZ2qzo0minT+d1uiux4+boaU+Ktk3aftgKXdp3f6DmViMVm+IqnaLneAIXBjWXMPqaknQH3THZjU/5eQsuriwRj0jnzzSf3Q/CZ7WpQA7fN/3W37MdqhUIa5oB4uuf2WJp5gyp3azR/kLEJXYd2He1wMs1B9kubBCapqmNiyyi7u0e01Hh7SZkcFBh8WKRiIHhA6oDkedtqMEuMxH8K/TxIqAh0Bhi5OvWVw3CUZNM6apqzVUnSAZ5p4QfCV9kgTI/PRFGvCIrRKArTHWVVqmcDEKzGVTPExYX91HlmBNasLCJ535KwKcgCY9fpqtFlNWjhaRNQ31HPhC6HKk67ZJ/QXo0hSbaWz+kAG41uVC7Hx+o68Qsbm/a59UltIbPPaF/A2U2TdnsXVIdUMNN5kE6ciqpYeMeU3QscnJ0tlztR2hGwWsmdJufVZHD4AGicVUNi8tY3e7ZEud0BIHWeC1favAhlAtbMjX7rF4nFOOHpMmzZA8SSfUrX4Tjw0ZvKtSKtWoXmT5KJwTw1Jslb6MTH0K0WOhU2ExbsPUlpt7Ks5sDVTYsTsoSSumGLdWej5PV+MJG8fn0WyyrCECfJYv/TcbbA2PlFz42XpuGpxC4WfUmkdWDuKZJSplWmsXMKe16zEbY00pUT6O5WWlOfBCNC8mgDmOCBF+q8W7QknGVZMinYddfde9YpsheKdsMuc3G1iGktdBJAMAkfstPiNKbv8ACZbcTMVjA6j1VJxRAQWwdRZVHU43LswaME0yAjkjOHq7eEe06tuEKcFcy7DPqD4dJpc95iB9enNDKlWyY7TNz2Ga2rQAcBrE75RXFdmKjXbdOqRewdcBXeynZ92FoNa+51Mceu9F69YNgOiDoLCfOJXns2T/AGycTrwXsSZkaeZ1MO7ZxDto7iBEAfqK1GAxocAZBB3rNdtATTLtpojcLADw1KHdks7IApk3mRMz6qz0+ePmhXKpcWelsKtUVQw1QuAtaFfoFJj7FydHicERw56H0TO02ZMc1tJrQNnU63T6DztA/pAv9EExNMve4tBMnxXXw403b+jP5E2tIv8AZrLG1Hyd3AiPEahemZfUDAGQBEzwjp7ry/KazqdQbhpf3Gi139cGsLhG1/dLZn0hZvMxylMs8eSUDTY/A06rS0xfhNl5rnPY7E0idhnxGSSNm5HhqtDhM6fUaDG0eVrekojhcZVcZaQRvG0ZB4Rpqs+KWTA9dFmSMcq2eYuwVVh71N46tKhNM8D5Fe4YfaeAHNc4cbG/UK4zLxIim08SQJ66LR/k39xKP/Ev08XyzsxiMQe4yBP6rIvW7DVwQHEEnQN4+K9nwWWFoM+QhXKeCA7xH7KuXnZZPWiLBjj/AEynZvs//TMaDE7wEeY7S6t16NlSuDcLPbbtl1qtF34gAi3RMa9DHYi59ApaeJST7GjHQR+KpGVUN/q0w4mLpLD6YTdeyr4jLmVBBaCRxClwlcOgq4WcE6VlbfEzWM7KYd7SH0WuuTaxueIg+CFVP9NcG7dUb0cfeVt9pOFQSmU5x6Yrd/RhMN/pXggZd8V/Iut6BajLsjoYduzRpMZaLCCep1KKhyZV62TOc5L3MVaekCMUI3gc7T6rM4+s7ahrC873EjSeULTY6i12pNuB+0IFi8E4j/bI332iHc9VWoo0JmV7V1GlgbsOudQ0u8r281m8LiHYasHaDSNnXzv4rY1cA7aBftEWglwPlMoF2gYGkwxxM8/SbrZhkkuH6JkW7NzkWOLxv3bxGi0NDVeb9kM0DYYYE2uV6LhXaHis/DjOgydxs8ZxlcMpE6lwtPD2VDIWkyCC4HmPoV2cuJ2RPnYeYSZXULJGzJItBBXZjGoGGcryHZpgw10gkev0UtEmoNlx2m+I9p9VYqU3uYZbeeXsUNwrntOy4gDgftqgraD0zRYDBsADWw4i8EH6j6rQ4Fj2FriBv0cARItPFZXC45jSNkk9GOjpJWpy2oKjpLtgxuFOfIysOXHK9mmE1WjT5dSc6HF4PKSfqUfotgWM9VncDiDoC53Mhon0CJiuQBNvELLwoeUrCxcRqu+NP4VQY6Ry4qcPEC6NUJQtavG/wWezTOGC21B38StLTY06gLOdrOy9Ku0vAhw8FIpJ7Cmik7HhtyQAOPJI7MZaC0gg7xcLBZtluIaNk1HFo0V7sw006Ba4/qJE7pV08MWrTNEHs1tPHkrhnFMuNPbG0NRwQnD1bm+8rOsyYurOcDcucSZ4lUrDG3ZbJ/h6Bh88Yx+wDLiRYX1Wtw9VxEkR1Wd7I5RTpN2iJO4n6rU/ECWq6MmWVuqI3c1G4iFK9/AqtiaZiyDEQ1tYi0WUznyLD1QwvOhMcrp4qDj+eSKWhmkdWcRoSPJAsxrtFyLjkAfWyOPdzQjMsGHxJJAvv9kUhjKS9z5hwB/ucJ8tEzM8C+o1wgC283J8StFsbOhAtwn3TajNoWIJ5gewUc6dodK0YHJ2PoPh4gbtItulehYPtDTa0bvzgsvnFNwEHZkaRAHVASKpsCXDmr2vV93QiSjolwOXue0bW20nQtANucI/SyOmwDb2ncCQDf2Sdk6DHGQNN4cY6EFaTFtZvE23k3Wyc2mYkZ8lom5PQADyVHE5UKl2wfAT9ETxeJpt/wCyOu1dZyr2lDCQKQA5vj6JIKbeh24rs6hldYPANXZHCRHlswtDhaTWADuHoJOn9oAWdo5w+uQKVCTxJcQOeq0eV4F4MvYGzrJk+RJhPki/+hYtfQewBbP6x4q8wBxDQXSqWGpncimFhohvzHU/mgWWSLUy38NrB33dANyqtxgE7DCeZ1Pioaj4JjvO47h0VWs873EpFjsPIIDGuPzAt8io6uO3Sh4dzgpTUMbijwJyIsTQa7dqg+IwQYTCNOrECdOqpYpxJm0W01TdDwkwLhySTHFH8vwoaJQfBtgvn/kUaw1SwN73/ApJDymGsLV2QOH55Kw7FADvIWyoTujmmvf49VVwEsIuxLd22eino4hsSC4HmgzakqzSBU9NAsJ4vvCSRO4hVqZ4gJaTvLgkcQeXP7pKpjroc54jT1KEZjjgP0HwP7q/VkDQrP5xiCB+8eyZIBDTzikTBDh/kHD7ovQe10Q4Ef5T6ELDVcY4OB2o4TEH7olg85YB3mtB/wCQHqpPF9odSDnaLL2PpyXhpHIT9UHwGCgfOHDdNvqpq+cBzCGvYeRE+u5dQxrC3UE8AfoYukSko0Nasodn8Yxji74lR0zaGsHgAiOYYzaBDQ48L+wWNYTTaHk7DZsQAaj+TRFhz0XOxOIryGyxhsRNz/k43P05LsyxXs5bnxlQzOa/eIqVA3i1nfd0tYeJQ7DubI+HRBvrU7x8tJ8Ci7cha0zUdszoPmefDcjWAy3dSZH9x73XdCEpxgqHinJ2yrlVSq6waY3k6W3bIsAtNluFfvOvD7BMwuBY35yXu3AaD2+vgjNGiYnQcBbz3rPKXIfolpNbT1ueGv8ACsXDSd519goqbL6eCmcLJFEjkQDgPE+ybVECQFYDIHVQvEphUDauMj8+iho49jtHeas1cMD4qkcAEn8Lk0Ww8ayFTxuIa3vON9wUJw53KnUwXEnx9kKQyGYfGiTtbzaPdHcI8DQyCgjsGNBbn7eqfRw7hcEwPL+EXT0Mw5UxAbcnfoqYxbnmwPUJlDCkm+7fqiFLDAaJaoWx+BYdSitIqsylopqbUrB2TFKQCJ37/ukATm2VcuxkR/FIFvuPJVcU1jxD224j7HRXHMUD6e8+BQGsyWa9lm1ATTLXDhcH08UAxORfCbMOEcHGy9Ar0Wk3EHiLGfoUPxbGxL5I4wZHU6jxsrVla0DgmYTD4IudYu6zuWio5c0gSNrmZVujhyD3APofIWPUK0KhOpCqy5m3RbjgkgLSwRruNQtAaLSdOQtYAcArlNjGCGhrI1dv8JnZ+qkpYipVe1rGAUho0Gw6aCeZVvMcrLCHPaHO/SwCQ3mQNSuw9rRy8rrI7IMNljAPiH5ZmdXO6Tc9Srfwn1G2/wBunOg3+J1U9B4EF5lx0b9FdoAvN/4Hssk0WRkV8JR2bNHiVfY0nh7KRr2iwEprq0WGv0S0M3ZJTaBf9v4UR1XNrE/dKRZSwUNcUxrU/ZKXZ5IgIKlPkmGnu/PBXNlNcySkfZZHoGVGD8Kr1MPJB/IRU0eS51LclY8QV8DkpWYUbhCItojgnGhxslY6ZUZQhWqdJSMpKanSUFsjIT2AJ+wkaIUZEN2SErZ8lzykDlW+xxjqkaiQntIIkacPzclcJ9vsVGGkG1jw+3AoWSiDEOaRp5IBWqy+O8OGvlwI5FH69AP4T5T9iqtSkN+v5YqNpbGiUW4dobDfLnyB06eSjDtzhfiPy6XEO4HwTsPTNWwHe+qyxfKRo+KCfZnBu24DtNdkSByneeJ8lpM2wYDSQ0Ex59eAUPYvLm0qQJHeKOV2zqvRw2qPPZ5XNs81xlBwfIEk+AAHHkruFqOfAAgeU8+QWjx+XBxsNVTFDYsBv8z9gqckGmW48qaoi2IEDXiVAKfBWS2/qpNiyzvZoRVpshOPA67/ALKYWvu3fdRkc+aWqQydnNMLg1N+64fnNS7JQ4hNATiE6EAjCEuxC4tTmoPsZMSm1OOq5KoA4JRKTRcAgwiuPFJK43XbkjbHSQxyQT4JzoTQEgw6YTSnhRlBhOFOSqOMb3tlw6HTwP3RnCa8VYr4YO1AhNGHN8RXPhsy2Gy11Uxw3keh5o/hMGykIGvFW6bQBZRYhst7uvNb/H8WOLvsxeR5Usml0G8rYW0xJkwuraSVI6zdypV3rXHRie2OLgbKpjKI3KJ+IM2H50Vik4xJ8vug2paClxBrmRqkA9fwq3imToq8QVlnFJmvHNtDD6KN7LKRybUVT6LUMLbpuylJKVplIOKGrglSRCgBXNSNC6UrXIfYRJgpwCQjenSiSziuTZXFIOdtQkdfRKEm0gwo6FzbLnOTCVWxznPTU3aXApWxqLeFciNS4Qqi7kiTH2RxupCZVcRKbbXOiR1QcFGbpoau3F2kcmSphypMSdYQ/EvgIjXqQhOMqz5KSdIrj2VXV9nqk/qdygrO03KuTHX2WV5KNUcVov8A9VKaXyh9F5J6aqw59kHJsdQUSYvC4vVB7ymUqh4qpy2WqIQL01rwoHOJ8U2rI0KWxqLQeEheN5VdlXiuqHeELCkWdoJHPVdp8ExwnVQNEzq25SU6s6qhVowla42goWGi65wTtuyq0yTqpSUrYyQ8vTDUUbnSntI3pGMkcHlISungmc0o1DiEjUoSpWMiWk66J0HW3IWxXKJhRaYstolaBKr18QAbqnmGP2ZEoTiMwO5daEk4o5soPkeh4oWQbEHgjGJfaEFxcjcrcvRnx9lSubKi8qeu7iqhqHcsWRm/GtE+1qmPrgDmoy0813wUlj8RWHaMnwU7gB+fl0jCAuIQ2FD6J1TnJQFG9t1CCOF09zEwBL8QoBo4iExThM2FHoiIaZvB0UggpSzVMYI8kowrWp7myliyY+xQkFCNBXJwcuBlVjDA4p068U14SNCW9jEoXQmgpZUYUPYrjH2VEclapmygGBMwBJN+NoQivSc1u0O8AdykzuoA6doz19kIGaFu1JFh5rditrRmlHZ7NitUMxn2XLluy9HMxdgivoVTGnl9Fy5c/J8jow+JM5c788kq5KWLoSmpiuXKCjWaKUpVyj6CiJMduXLlUOKnjeuXKxgQtPVMOq5clCOcohu6H6pVyEhkNG7olC5cqwnO90rNVy5KMhWpXbly5QI9u9SnTxXLkRWYbtL856rO5np4JVy3+P0imR//2Q=="
            }
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-700">
            {profile?.name || "John Doe"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
